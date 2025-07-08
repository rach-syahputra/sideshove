export interface Order {
  id: string;
  status: {
    code: string;
    description: string;
  };
  createdAt: string;
}
