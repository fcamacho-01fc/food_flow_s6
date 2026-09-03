import { Pool } from "pg";

import { env } from "../config/env";

export const postgres = new Pool({
  host: env.database.host,

  port: env.database.port,

  user: env.database.user,

  password: env.database.password,

  database: env.database.name,

  max: 10,
});

export async function testDatabaseConnection(): Promise<void> {
  const result = await postgres.query("SELECT NOW() AS server_time");

  console.log("PostgreSQL connected:", result.rows[0].server_time);
}
