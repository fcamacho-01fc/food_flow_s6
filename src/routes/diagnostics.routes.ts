import { Router } from "express";

import { env } from "../config/env";

import { paymentProvider } from "../providers/payment.provider";

export const diagnosticsRouter = Router();

diagnosticsRouter.get("/instance", (req, res) => {
  res.json({
    instance: env.instanceId,

    pid: process.pid,

    uptime: process.uptime(),
  });
});

diagnosticsRouter.get("/payment-charges", (req, res) => {
  const charges = paymentProvider.getCharges();

  res.json({
    count: charges.length,

    data: charges,
  });
});
