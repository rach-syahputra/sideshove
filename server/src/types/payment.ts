import { Pagination } from "./pagination";

export interface GetPaymentsRequest extends Pagination {
  keywords?: string;
}

export interface GetPaymentByIdRequest {
  paymentId: string;
}
