import type { Config } from 'drizzle-kit';

const isDev = process.env.NODE_ENV === 'development' || !process.env.DATABASE_URL;

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  ...(isDev
    ? {
        driver: 'better-sqlite',
        dbCredentials: {
          url: 'file:./dev.db',
        },
      }
    : {
        driver: 'pg',
        dbCredentials: {
          connectionString: process.env.DATABASE_URL!,
        },
      }),
} satisfies Config;
