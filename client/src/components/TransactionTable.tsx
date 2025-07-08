import { Order } from "@/lib/types/order";
import { formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

interface TransactionTableProps {
  orders: Order[];
}

const TransactionTable = ({ orders }: TransactionTableProps) => {
  const handlePayNow = (id: string) => {
    // full checkout page reload to ensure script re-attaching
    window.location.href = `checkout/${id}`;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Holder</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Paid At</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.length > 0 &&
          orders.map((order, index) => (
            <TableRow key={index}>
              <TableCell className="text-xs">{order.id}</TableCell>
              <TableCell>{order.holder ?? ""}</TableCell>
              <TableCell>{order.brand ?? ""}</TableCell>
              <TableCell>
                {order.status === "PENDING" ? (
                  <span className="px-2 text-xs py-1 rounded-sm bg-amber-400">
                    {order.status}
                  </span>
                ) : order.status === "SUCCESS" ? (
                  <span className="px-2 text-xs py-1 rounded-sm bg-green-400">
                    {order.status}
                  </span>
                ) : (
                  <span className="px-2 text-xs py-1 rounded-sm bg-red-400">
                    {order.status}
                  </span>
                )}
              </TableCell>
              <TableCell>{order.currency ?? ""}</TableCell>
              <TableCell>{formatDate(new Date(order.createdAt))}</TableCell>
              <TableCell>
                {" "}
                {order.paidAt ? formatDate(new Date(order.paidAt)) : ""}
              </TableCell>
              {order.status === "PENDING" ? (
                <TableCell className="text-right">
                  <Button
                    onClick={() => handlePayNow(order.id)}
                    className="w-fit px-3 h-7 text-sm place-self-end"
                  >
                    Pay Now
                  </Button>
                </TableCell>
              ) : (
                <TableCell className="text-muted-foreground text-right">
                  No Action
                </TableCell>
              )}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
