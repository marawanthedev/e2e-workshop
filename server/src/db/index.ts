import pg from "pg";
import { config } from "../config.js";

if (!config.databaseUrl) {
  throw new Error("DATABASE_URL is missing. Add your Neon connection string to server/.env");
}

export const pool = new pg.Pool({ connectionString: config.databaseUrl });
