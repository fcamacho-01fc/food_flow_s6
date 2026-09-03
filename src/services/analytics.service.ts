import { delay } from "../utils/delay";
import { Order } from "../types/order.types";

class AnalyticsService {
  async trackOrderCreated(order: Order): Promise<void> {
    await delay(350);

    console.log(`[analytics] Order tracked ${order.id}`);
  }
}

export const analyticsService = new AnalyticsService();
