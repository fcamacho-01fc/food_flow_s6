import express from "express";

import { orderRouter } from "./routes/order.routes";
import { restaurantRouter } from "./routes/restaurant.routes";
import { diagnosticsRouter } from "./routes/diagnostics.routes";

import { requestLogger } from "./middlewares/request-logger.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";

export const app = express();

app.use(express.json());

app.use(requestLogger);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/api/orders", orderRouter);

app.use("/api/restaurants", restaurantRouter);

app.use("/api/diagnostics", diagnosticsRouter);

app.use(errorMiddleware);
