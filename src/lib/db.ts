/**
 * Vercel Postgres Database Client
 * Provides connection to Vercel Postgres database
 */

import { sql } from '@vercel/postgres';

export { sql };

// Helper function to check if database connection is available
export function isDatabaseAvailable(): boolean {
    return !!process.env.POSTGRES_URL;
}
