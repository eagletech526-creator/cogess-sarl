import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./api/lib/db";
import { messages, users } from "./api/lib/schema";
import { eq, desc } from "drizzle-orm";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_api_key_here" 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

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
          // Don't fail the request if email sending fails
        }
      } else {
        console.warn("RESEND_API_KEY not set. Email not sent.");
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

  // Sync User Profile (called on client login)
  app.post("/api/sync-user", async (req, res) => {
    try {
      const { id, email, firstName, lastName, imageUrl } = req.body;
      
      if (!id || !email) {
        return res.status(400).json({ error: "Missing identity info" });
      }

      // Upsert user
      const existingUser = await db.query.users.findFirst({
        where: eq(users.id, id),
      });

      if (existingUser) {
        await db.update(users).set({
          firstName,
          lastName,
          imageUrl,
          email, // in case it changed
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

  // Handle static files and SPA routing in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Only listen when running locally, not in Vercel
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

  return app;
}

// Export the app for Vercel serverless environment
const appPromise = startServer();
export default async (req: any, res: any) => {
  const app = await appPromise;
  app(req, res);
};
