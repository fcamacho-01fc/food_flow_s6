export const env = {
  port: Number(process.env.PORT ?? 3000),
  instanceId: process.env.INSTANCE_ID ?? "local",
  paymentTimeoutMs: Number(process.env.PAYMENT_TIMEOUT_MS ?? 500),

  //implement database connection
  database: {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USER ?? "foodflow",
    password: process.env.DB_PASSWORD ?? "foodflow123",
    database: process.env.DB_NAME ?? "foodflow",
  },

  //  TODO:   //implement mongo database connection configuration
};
