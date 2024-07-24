import { createConnection, Connection } from "mysql2/promise";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_USERNAME } from "../utils/pEnv";
import { connect } from "http2";

export default class DbManager {
    private static db: Connection | null = null;

    static async connectToDb(): Promise<void> {
        if (DbManager.db) return; // Si la connexion existe déjà, on ne la recrée pas

        try {
            DbManager.db = await createConnection({
                host: DATABASE_HOST,
                user: DATABASE_USERNAME,
                password: DATABASE_PASSWORD,
                database: DATABASE_NAME
            });
            console.log("Connected to the database successfully");
            DbManager.db.query("CREATE TABLE IF NOT EXISTS reaction (discordId VARCHAR(255),messageId VARCHAR(255),roleId VARCHAR(255))")
        } catch (error) {
            console.error("Error connecting to the database:", error);
            throw error;
        }
    }

    static getDb(): Connection | null {
        if (!DbManager.db) {
            console.error("Database connection is not established");
        }
        return DbManager.db;
    }
}
