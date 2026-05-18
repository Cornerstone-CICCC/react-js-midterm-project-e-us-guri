import { api } from "./api";

export interface CreateIntentResponse {
  clientSecret: string;
  amount: number;
}

export function createPaymentIntent(
  token: string | null
): Promise<CreateIntentResponse> {
  return api<CreateIntentResponse>("/payments/create-intent", {
    method: "POST",
    token,
  });
}
