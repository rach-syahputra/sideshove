import { getCustomer } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomerDialogProps {
  email: string;
  mobileNumber: string;
}

const CustomerDialog = ({ email, mobileNumber }: CustomerDialogProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="text-blue-700 transition-all duration-150 ease-in-out hover:text-blue-500">
        {getCustomer({
          email,
          mobileNumber,
        })}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Customer</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {mobileNumber && <DropdownMenuItem>{mobileNumber}</DropdownMenuItem>}
        {email && <DropdownMenuItem>{email}</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomerDialog;
