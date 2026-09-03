import { app } from "./app";

import { env } from "./config/env";

import { testDatabaseConnection } from "./database/postgres";

async function start() {
  try {
    await testDatabaseConnection();

    app.listen(env.port, () => {
      console.log(
        [
          "FoodFlow API started",
          `instance=${env.instanceId}`,
          `port=${env.port}`,
          `pid=${process.pid}`,
        ].join(" | "),
      );
    });
  } catch (error) {
    console.error("Unable to connect to PostgreSQL", error);

    process.exit(1);
  }
}

start();
