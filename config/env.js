import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
    // Only load local .env files in development
    config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
}

export const { 
    PORT, NODE_ENV,
    DB_URI,
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_KEY, ARCJET_ENV
} = process.env;