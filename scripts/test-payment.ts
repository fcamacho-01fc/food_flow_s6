const BASE_URL = "http://localhost:3001";

async function main() {
  console.log("Creating order with simulated payment timeout...");

  const idempotencyKey = `PAYMENT-${Date.now()}`;

  const response = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
      "X-Payment-Scenario": "timeout-after-charge",
    },
    body: JSON.stringify({
      customerId: "customer-1",
      restaurantId: "restaurant-1",
      items: [
        {
          productId: "burger-1",
          quantity: 1,
          price: 150,
        },
      ],
    }),
  });

  const body = await response.json();

  console.log("\nOrder response");
  console.log("Status:", response.status);
  console.log("Response:", body);

  // Esperamos un poco para permitir que el primer pago,
  // que hizo timeout, termine en segundo plano.
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const chargesResponse = await fetch(
    `${BASE_URL}/api/diagnostics/payment-charges`,
  );

  const chargesBody = await chargesResponse.json();

  console.log("\nPayment diagnostics");
  console.log(chargesBody);

  const allCharges = chargesBody.data ?? [];

  const chargesForThisOrder = allCharges.filter(
    (charge: any) => charge.orderId === body.id,
  );

  console.log("\nExpected charges: 1");
  console.log("Actual charges:", chargesForThisOrder.length);

  if (chargesForThisOrder.length > 1) {
    console.log("\n Duplicate payment detected.");
  } else {
    console.log("\nNo duplicate payment detected.");
  }
}

main().catch(console.error);
