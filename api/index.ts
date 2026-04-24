import "dotenv/config";
import express from "express";
import { db } from "./lib/db";
import { messages, users } from "./lib/schema";
import { eq, desc } from "drizzle-orm";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_api_key_here" 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

const app = express();
app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Save Contact Message
app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, subject, message, userId } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await db.insert(messages).values({
      name,
      email,
      subject,
      message,
      userId: userId || null,
    }).returning();

    // Send email notification
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Cogese Contact <onboarding@resend.dev>',
          to: 'eagletech526@gmail.com',
          subject: `New Request: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    }

    res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Admin Data Endpoint
app.get("/api/admin/data", async (req, res) => {
  try {
    const [allMessages, allUsers] = await Promise.all([
      db.select().from(messages).orderBy(desc(messages.createdAt)),
      db.select().from(users).orderBy(desc(users.createdAt)),
    ]);

    res.json({ messages: allMessages, users: allUsers });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete message
app.delete("/api/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(messages).where(eq(messages.id, id));
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Sync User Profile
app.post("/api/sync-user", async (req, res) => {
  try {
    const { id, email, firstName, lastName, imageUrl } = req.body;
    
    if (!id || !email) {
      return res.status(400).json({ error: "Missing identity info" });
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (existingUser) {
      await db.update(users).set({
        firstName,
        lastName,
        imageUrl,
        email,
      }).where(eq(users.id, id));
    } else {
      await db.insert(users).values({
        id,
        email,
        firstName,
        lastName,
        imageUrl,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default app;
