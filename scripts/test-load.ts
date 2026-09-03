export {};

const port = 3001;

const totalRequests = 30;

function percentile(values: number[], percentile: number): number {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil(percentile * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

async function requestOrders(): Promise<number> {
  const started = performance.now();
  const response = await fetch(`http://localhost:${port}/api/orders`);
  await response.json();
  return performance.now() - started;
}

async function main() {
  console.log(`Running ${totalRequests} requests...`);
  const promises = Array.from(
    {
      length: totalRequests,
    },
    () => requestOrders(),
  );

  const times = await Promise.all(promises);
  const average = times.reduce((sum, value) => sum + value, 0) / times.length;

  console.log();
  console.log(`Average: ${average.toFixed(0)}ms`);
  console.log(`P50: ${percentile(times, 0.5).toFixed(0)}ms`);
  console.log(`P95: ${percentile(times, 0.95).toFixed(0)}ms`);
  console.log(`P99: ${percentile(times, 0.99).toFixed(0)}ms`);
}

main().catch(console.error);
