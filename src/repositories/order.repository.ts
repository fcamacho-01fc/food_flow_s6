import { randomUUID } from "crypto";

import { CreateOrderDTO, Order } from "../types/order.types";

import { delay } from "../utils/delay";

class OrderRepository {
  private orders: Order[] = [];

  constructor() {
    this.seed();
  }

  private seed(): void {
    for (let i = 0; i < 60; i++) {
      const restaurantNumber = (i % 5) + 1;

      this.orders.push({
        id: randomUUID(),
        customerId: `customer-${i + 1}`,
        restaurantId: `restaurant-${restaurantNumber}`,
        items: [
          {
            productId: `product-${i + 1}`,
            quantity: 1,
            price: 100 + (i % 10) * 10,
          },
        ],
        total: 100 + (i % 10) * 10,
        status: "paid",
        createdAt: new Date(),
      });
    }
  }

  async findAll(): Promise<Order[]> {
    await delay(70);

    return [...this.orders];
  }

  async findById(id: string): Promise<Order | null> {
    await delay(40);

    return this.orders.find((order) => order.id === id) ?? null;
  }

  async create(dto: CreateOrderDTO): Promise<Order> {
    await delay(60);

    const total = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order: Order = {
      id: randomUUID(),
      customerId: dto.customerId,
      restaurantId: dto.restaurantId,
      items: dto.items,
      total,
      status: "pending",
      createdAt: new Date(),
    };

    this.orders.push(order);

    return order;
  }

  async save(order: Order): Promise<Order> {
    await delay(50);

    const index = this.orders.findIndex((current) => current.id === order.id);

    if (index >= 0) {
      this.orders[index] = order;
    }

    return order;
  }
}

export const orderRepository = new OrderRepository();
