import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

/**
 * Cleans the DATABASE_URL if it contains psql command wrappers or quotes.
 */
function getCleanDatabaseUrl() {
  const rawUrl = process.env.DATABASE_URL;
  if (!rawUrl) {
    throw new Error("DATABASE_URL is not set in environment variables.");
  }

  // Handle 'psql "postgresql://..." ' pattern
  const psqlMatch = rawUrl.match(/psql\s+['"]?([^'"]+)['"]?/);
  if (psqlMatch) {
    return psqlMatch[1];
  }

  // Handle simple quoted strings or leading/trailing whitespace
  return rawUrl.trim().replace(/^['"]|['"]$/g, '');
}

const sql = neon(getCleanDatabaseUrl());
export const db = drizzle(sql, { schema });
