import { Pagination } from "./pagination";

export interface GetPaymentsRequest extends Pagination {}

export interface GetPaymentByIdRequest {
  paymentId: string;
}
