type OrderType = "PENDING" | "SUCCESS" | "EXPIRED";

export interface Order {
  id: string;
  status: OrderType;
  createdAt: string;
}
