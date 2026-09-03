import { spawn } from "node:child_process";

const instances = [
  { id: "api-1", port: 3001 },
  { id: "api-2", port: 3002 },
  { id: "api-3", port: 3003 },
];

for (const instance of instances) {
  const child = spawn(process.execPath, ["--import", "tsx", "src/server.ts"], {
    env: {
      ...process.env,
      PORT: String(instance.port),
      INSTANCE_ID: instance.id,
    },
    stdio: "inherit",
  });

  child.on("error", (error) => {
    console.error(
      `Error starting ${instance.id} on port ${instance.port}:`,
      error,
    );
  });

  child.on("exit", (code) => {
    console.log(
      `${instance.id} on port ${instance.port} stopped with code ${code}`,
    );
  });
}
