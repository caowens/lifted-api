import { DB_URI } from "../config/env.js";
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import connectToDatabase from "../database/mongodb.js";
import Quote from "../models/quote.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedInspirationalQuotes() {
    try {
        await connectToDatabase();
        console.log("Connected to MongoDB for seeding.");

        // Load JSON dataset
        const filePath = path.join(__dirname, 'inspirational_quotes.json');
        const rawData = await fs.readFile(filePath, 'utf-8');
        const quotes = JSON.parse(rawData);

        let count = 0;

        for (const q of quotes) {
            try {
                // Upsert: add if it doesn't already exist
                await Quote.updateOne(
                { text: q.text },
                {
                    $setOnInsert: {
                    text: q.text,
                    author: q.author || 'Unknown',
                    tags: q.tags || [],
                    userId: null
                    }
                },
                { upsert: true }
                );
                count++;
            } catch (err) {
                console.log('Skipped duplicate:', q.text.substring(0, 30));
            }
        }

        const allQuotesLength = await Quote.countDocuments();

        console.log(`Seeded ${count} quotes out of ${allQuotesLength} successfully!`);
        process.exit(0);
    } catch (err) {
    console.error('Error seeding quotes:', err);
    process.exit(1);
  }
} 

await seedInspirationalQuotes();