import { NextFunction, Request, Response } from "express";

import { orderService } from "../services/order.service";

import { PaymentScenario } from "../types/payment.types";

class OrderController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.getOrders();

      res.json({
        count: orders.length,

        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;
      const order = await orderService.getOrder(id);

      if (!order) {
        res.status(404).json({
          message: "Order not found",
        });

        return;
      }

      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const idempotencyKey = req.header("Idempotency-Key");

      if (!idempotencyKey) {
        res.status(400).json({
          message: "Idempotency-Key header is required",
        });

        return;
      }

      const scenario = (req.header("X-Payment-Scenario") ??
        "normal") as PaymentScenario;

      const order = await orderService.createOrder(
        req.body,
        idempotencyKey,
        scenario,
      );

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
}

export const orderController = new OrderController();
