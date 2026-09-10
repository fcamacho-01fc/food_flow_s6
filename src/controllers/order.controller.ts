import { Request, Response } from "express";
import { orderService } from "../services/order.service";
import { OrderStatus } from "../types/order.types";

class OrderController {
  async create(req: Request, res: Response) {
    try {
      const order = await orderService.createOrder(req.body);

      return res.status(201).json(order);
    } catch (error) {
      console.error("Error creating order:", error);

      return res.status(500).json({
        error: "Could not create order",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const orders = await orderService.getOrders();

      return res.status(200).json(orders);
    } catch (error) {
      console.error("Error getting orders:", error);

      return res.status(500).json({
        error: "Could not get orders",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const order = await orderService.getOrderById(id);

      if (!order) {
        return res.status(404).json({
          error: "Order not found",
        });
      }

      return res.status(200).json(order);
    } catch (error) {
      console.error("Error getting order:", error);

      return res.status(500).json({
        error: "Could not get order",
      });
    }
  }
  // TODO: completa el service porque aqui ya esta creado el update de order (PATCH), recuerda que el orden en capas es router -> controller -> service -> repository

  async updateStatus(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { status } = req.body;

      const validStatuses: OrderStatus[] = ["pending", "paid", "cancelled"];

      if (!status) {
        return res.status(400).json({
          error: "Status is required",
        });
      }

      if (!validStatuses.includes(status as OrderStatus)) {
        return res.status(400).json({
          error: "Invalid order status",
          allowedStatuses: validStatuses,
        });
      }
      // TODO: ya que completes el service, descomenta estas lineas para que el controller pueda hacer el update de un order, recuerda que repository es el encargado de la persistencia de datos y service es el encargado de la lógica de negocio
      // const order = await orderService.updateStatus(id, status as OrderStatus);

      // if (!order) {
      //   return res.status(404).json({
      //     error: "Order not found",
      //   });
      // }

      //return res.status(200).json(order);
    } catch (error) {
      console.error("Error updating order status:", error);

      return res.status(500).json({
        error: "Could not update order status",
      });
    }
  }
  // TODO: Implement delete method, recuerda que el orden en capas es router -> controller -> service -> repository
}

export const orderController = new OrderController();
