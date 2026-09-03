
export const env = {
    port: Number(process.env.PORT ?? 3000),

    instanceId:
        process.env.INSTANCE_ID ?? "local",

    paymentTimeoutMs:
        Number(process.env.PAYMENT_TIMEOUT_MS ?? 500)
};