import { app } from "./app";

import { env } from "./config/env";

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

// TODO: call database initialization
