import { ChildProcess, spawn } from "child_process";

const ports = [3001, 3002, 3003];

const processes: ChildProcess[] = [];

for (let index = 0; index < ports.length; index++) {
  const port = ports[index];

  const instanceId = `api-${index + 1}`;

  const command = process.platform === "win32" ? "npx.cmd" : "npx";

  const child = spawn(command, ["tsx", "src/server.ts"], {
    env: {
      ...process.env,

      PORT: String(port),

      INSTANCE_ID: instanceId,
    },

    stdio: "inherit",
  });

  processes.push(child);
}

function shutdown() {
  console.log("\nStopping cluster...");

  for (const child of processes) {
    child.kill();
  }

  process.exit();
}

process.on("SIGINT", shutdown);

process.on("SIGTERM", shutdown);
