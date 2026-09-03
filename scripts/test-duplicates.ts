const ports = [3001, 3002, 3003];

const idempotencyKey = `ORDER-${Date.now()}`;

const body = {
  customerId: "customer-demo",

  restaurantId: "restaurant-1",

  items: [
    {
      productId: "burger-1",

      quantity: 1,

      price: 250,
    },
  ],
};

async function send(port: number) {
  const started = performance.now();

  const response = await fetch(`http://localhost:${port}/api/orders`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      "Idempotency-Key": idempotencyKey,
    },

    body: JSON.stringify(body),
  });

  const data = await response.json();

  const elapsed = performance.now() - started;

  return {
    port,
    status: response.status,
    elapsed: Math.round(elapsed),
    data,
  };
}

async function main() {
  console.log("Sending same operation to 3 API instances...");

  console.log(`Idempotency-Key: ${idempotencyKey}`);

  const results = await Promise.all(ports.map(send));

  console.table(
    results.map((result) => ({
      port: result.port,

      status: result.status,

      orderId: result.data.id,

      elapsed: result.elapsed,
    })),
  );

  const orderIds = new Set(results.map((result) => result.data.id));

  console.log(`\nExpected unique orders: 1`);

  console.log(`Actual unique orders: ${orderIds.size}`);

  if (orderIds.size > 1) {
    console.log("\nDuplicate orders detected.");
  }
}

main().catch(console.error);
