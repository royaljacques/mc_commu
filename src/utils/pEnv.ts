import 'dotenv/config';

// Load environment variables


const BOT_TOKEN: string = <string>process.env.BOT_TOKEN;
const BOT_ID: string = <string>process.env.BOT_ID;
const BOT_SECRET = process.env.BOT_SECRET;
const GUILD_OWNER_ID: string = <string>process.env.GUILD_OWNER_ID;

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
// Check for missing environment variables
if (!BOT_TOKEN || !BOT_ID || !BOT_SECRET || !GUILD_OWNER_ID) {
    throw new Error("Missing environment variables");
}

// Export the variables
export {
    BOT_TOKEN,
    BOT_ID,
    BOT_SECRET,
    GUILD_OWNER_ID,
    DATABASE_HOST,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME,
};
