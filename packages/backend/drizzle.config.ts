/// <reference types="node" />
import path from 'path';
import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// load environment variables from the workspace root .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts', 
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});