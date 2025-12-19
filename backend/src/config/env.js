import dotenv from 'dotenv';

dotenv.config();



export const ENV = {
    PORT: process.env.PORT || 3000,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
    OMDB_API_KEY: process.env.OMDB_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};