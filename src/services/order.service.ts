import { randomUUID } from "crypto";

import {
  CreateOrderDTO,
  Order,
  OrderWithRestaurant,
} from "../types/order.types";

import { PaymentScenario } from "../types/payment.types";

import { orderRepository } from "../repositories/order.repository";

import { restaurantService } from "./restaurant.service";
import { paymentService } from "./payment.service";
import { notificationService } from "./notification.service";
import { analyticsService } from "./analytics.service";
import { idempotencyService } from "./idempotency.service";

class OrderService {
  async getOrders(): Promise<OrderWithRestaurant[]> {
    const orders = await orderRepository.findAll();

    const result: OrderWithRestaurant[] = [];

    for (const order of orders) {
      const restaurant = await restaurantService.getById(order.restaurantId);

      result.push({
        ...order,
        restaurant,
      });
    }

    return result;
  }

  async getOrder(id: string): Promise<Order | null> {
    return orderRepository.findById(id);
  }

  async createOrder(
    dto: CreateOrderDTO,
    idempotencyKey: string,
    paymentScenario: PaymentScenario,
  ): Promise<Order> {
    const existing = idempotencyService.find(idempotencyKey);

    if (existing) {
      return existing;
    }

    this.validateOrder(dto);

    const restaurant = await restaurantService.getById(dto.restaurantId);

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    if (!restaurant.open) {
      throw new Error("Restaurant is closed");
    }

    const order = await orderRepository.create(dto);

    const requestId = randomUUID();

    try {
      await paymentService.processPayment(
        requestId,
        order.id,
        order.total,
        paymentScenario,
      );
    } catch {
      order.status = "cancelled";

      await orderRepository.save(order);

      throw new Error("Unable to complete payment");
    }

    order.status = "paid";

    await orderRepository.save(order);

    await notificationService.sendOrderConfirmation(order);

    await analyticsService.trackOrderCreated(order);

    idempotencyService.save(idempotencyKey, order);

    return order;
  }

  private validateOrder(dto: CreateOrderDTO): void {
    if (!dto.customerId) {
      throw new Error("customerId is required");
    }

    if (!dto.restaurantId) {
      throw new Error("restaurantId is required");
    }

    if (!Array.isArray(dto.items) || dto.items.length === 0) {
      throw new Error("Order requires items");
    }
  }
}

export const orderService = new OrderService();
