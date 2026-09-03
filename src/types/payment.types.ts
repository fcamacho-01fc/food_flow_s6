export type PaymentScenario = "normal" | "failure" | "timeout-after-charge";

export interface PaymentRequest {
  requestId: string;
  orderId: string;
  amount: number;
}

export interface PaymentResult {
  transactionId: string;
  status: "success";
}

export interface PaymentCharge {
  transactionId: string;
  requestId: string;
  orderId: string;
  amount: number;
  createdAt: Date;
}
