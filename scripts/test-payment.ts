const port = 3001;

const paymentRequestBody = {
  customerId: "customer-payment",

  restaurantId: "restaurant-1",

  items: [
    {
      productId: "premium-burger",

      quantity: 1,

      price: 850,
    },
  ],
};

async function main() {
  console.log("Creating order with simulated payment timeout...");

  const response = await fetch(`http://localhost:${port}/api/orders`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

      "Idempotency-Key": `PAY-${Date.now()}`,

      "X-Payment-Scenario": "timeout-after-charge",
    },

    body: JSON.stringify(body),
  });

  const order = await response.json();

  console.log("\nOrder response:");

  console.log(order);

  await new Promise((resolve) => setTimeout(resolve, 1800));

  const diagnostics = await fetch(
    `http://localhost:${port}/api/diagnostics/payment-charges`,
  );

  const charges = await diagnostics.json();

  console.log("\nPayment provider records:");

  console.table(
    charges.data.map((charge: any) => ({
      transactionId: charge.transactionId,

      orderId: charge.orderId,

      amount: charge.amount,
    })),
  );
}

main().catch(console.error);
