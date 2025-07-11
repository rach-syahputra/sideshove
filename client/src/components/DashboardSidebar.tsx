"use client";

import { JSX, useState } from "react";
import Link from "next/link";
import { ChevronRight, History, MessageCircleMore } from "lucide-react";

import { cn } from "@/lib/utils";
import { useDashboardSidebarContext } from "@/context/DashboardSidebarContext";

interface SidebarGroupProps {
  title: string;
  icon: JSX.Element;
  items: {
    href: string;
    label: string;
  }[];
}

interface SidebarItemProps {
  label: string;
  href: string;
  className?: string;
}

const DashboardSidebar = () => {
  const { open } = useDashboardSidebarContext();

  return (
    <aside
      className={cn(
        "fixed top-16 left-0 h-full min-h-[calc(100svh-64px)] w-[220px] border-r shadow transition-all duration-150 ease-in-out max-lg:hidden",
        {
          "-ml-[220px]": !open,
        },
      )}
    >
      <SidebarGroup
        title="Payment Request"
        icon={<MessageCircleMore strokeWidth={1.5} className="w-5" />}
        items={[
          {
            href: "/merchant/once_off_payment_request",
            label: "Single Payment Request",
          },
        ]}
      />
      <SidebarGroup
        title="Transactions"
        icon={<History strokeWidth={1.5} className="w-5" />}
        items={[
          {
            href: "/merchant/transactions",
            label: "Transaction Log",
          },
          {
            href: "/merchant/payments",
            label: "Payment History",
          },
        ]}
      />
    </aside>
  );
};

const SidebarGroup = ({ title, icon, items }: SidebarGroupProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        onClick={() => setOpen(!open)}
        className="relative flex h-11 w-full cursor-pointer items-center px-4 text-sm font-medium transition-all duration-150 ease-in-out select-none hover:bg-gray-200/80"
      >
        <div className="w-7">{icon}</div>
        {title}
        <ChevronRight
          className={cn(
            "absolute right-4 w-4 transition-all duration-150 ease-in-out",
            {
              "rotate-90": open,
            },
          )}
        />
      </div>
      <div
        className={cn(
          "flex h-0 w-full flex-col transition-all duration-150 ease-in-out",
          {
            "h-fit": open,
          },
        )}
      >
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            href={item.href}
            label={item.label}
            className={cn("invisible h-0 opacity-0", {
              "visible h-9 opacity-100": open,
            })}
          />
        ))}
      </div>
    </div>
  );
};

const SidebarItem = ({ href, label, className }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex cursor-pointer items-center px-4 text-sm transition-all duration-150 ease-in-out select-none hover:bg-gray-100 hover:text-gray-600",
        className,
      )}
    >
      {label}
    </Link>
  );
};

export default DashboardSidebar;
