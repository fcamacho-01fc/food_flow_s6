import { delay } from "../utils/delay";
import { Order } from "../types/order.types";

class NotificationService {
  async sendOrderConfirmation(order: Order): Promise<void> {
    await delay(900);

    console.log(`[notification] Confirmation sent for order ${order.id}`);
  }
}

export const notificationService = new NotificationService();
