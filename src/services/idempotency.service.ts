import { Order } from "../types/order.types";

class IdempotencyService {
  private processedRequests = new Map<string, Order>();

  find(key: string): Order | undefined {
    return this.processedRequests.get(key);
  }

  save(key: string, order: Order): void {
    this.processedRequests.set(key, order);
  }
}

export const idempotencyService = new IdempotencyService();
