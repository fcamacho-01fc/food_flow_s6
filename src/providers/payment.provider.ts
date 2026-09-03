import { randomUUID } from "crypto";

import { delay } from "../utils/delay";

import {
  PaymentCharge,
  PaymentRequest,
  PaymentResult,
  PaymentScenario,
} from "../types/payment.types";

class PaymentProvider {
  private charges: PaymentCharge[] = [];

  private attempts = new Map<string, number>();

  async charge(
    request: PaymentRequest,
    scenario: PaymentScenario,
  ): Promise<PaymentResult> {
    const previousAttempts = this.attempts.get(request.requestId) ?? 0;

    const currentAttempt = previousAttempts + 1;

    this.attempts.set(request.requestId, currentAttempt);

    if (scenario === "failure") {
      await delay(250);

      throw new Error("Payment provider rejected transaction");
    }

    if (scenario === "timeout-after-charge" && currentAttempt === 1) {
      await delay(250);

      const transactionId = this.registerCharge(request);

      await delay(1200);

      return {
        transactionId,
        status: "success",
      };
    }

    await delay(250);

    const transactionId = this.registerCharge(request);

    return {
      transactionId,
      status: "success",
    };
  }

  private registerCharge(request: PaymentRequest): string {
    const transactionId = `TX-${randomUUID()}`;

    this.charges.push({
      transactionId,

      requestId: request.requestId,

      orderId: request.orderId,

      amount: request.amount,

      createdAt: new Date(),
    });

    return transactionId;
  }

  getCharges(): PaymentCharge[] {
    return [...this.charges];
  }
}

export const paymentProvider = new PaymentProvider();
