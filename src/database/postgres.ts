import { Pool } from "pg";
import { env } from "../config/env";

// initialize a database connection using the configuration from env.ts
export const postgres = new Pool({
  host: env.database.host,
  port: env.database.port,
  user: env.database.user,
  password: env.database.password,
  database: env.database.database,
});

export async function testConnection(): Promise<void> {
  const result = await postgres.query("SELECT NOW() AS server_time");
  console.log(
    "Database connection successful. Server time:",
    result.rows[0].server_time,
  );
}
