import { env } from "../config/env";

import { PaymentResult, PaymentScenario } from "../types/payment.types";

import { TimeoutError, withTimeout } from "../utils/timeout";

import { paymentProvider } from "../providers/payment.provider";

class PaymentService {
  async processPayment(
    requestId: string,
    orderId: string,
    amount: number,
    scenario: PaymentScenario,
  ): Promise<PaymentResult> {
    try {
      return await withTimeout(
        paymentProvider.charge(
          {
            requestId,
            orderId,
            amount,
          },
          scenario,
        ),

        env.paymentTimeoutMs,
      );
    } catch (error) {
      if (error instanceof TimeoutError) {
        return withTimeout(
          paymentProvider.charge(
            {
              requestId,
              orderId,
              amount,
            },
            scenario,
          ),

          env.paymentTimeoutMs,
        );
      }

      throw new Error("Payment failed");
    }
  }
}

export const paymentService = new PaymentService();
