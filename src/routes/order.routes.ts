import { Router } from "express";

import { orderController } from "../controllers/order.controller";

export const orderRouter = Router();

orderRouter.get("/", orderController.getAll.bind(orderController));

orderRouter.get("/:id", orderController.getById.bind(orderController));

orderRouter.post("/", orderController.create.bind(orderController));
