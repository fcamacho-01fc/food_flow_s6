import { app } from "./app";

import { env } from "./config/env";
import { testConnection } from "./database/postgres";

async function start() {
  try {
    await testConnection();
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
  } catch (e) {
    console.error("Failed to start the server:", e);
    process.exit(1);
  }
}

start();
// call database initialization
