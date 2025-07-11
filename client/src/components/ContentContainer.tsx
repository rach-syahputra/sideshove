"use client";

import { ReactNode } from "react";

import { useDashboardSidebarContext } from "@/context/DashboardSidebarContext";
import { cn } from "@/lib/utils";

interface ContentContainerProps {
  children: ReactNode;
}

const ContentContainer = ({ children }: ContentContainerProps) => {
  const { open } = useDashboardSidebarContext();
  return (
    <div
      className={cn(
        "mt-16 h-full w-full transition-all duration-150 ease-in-out lg:ml-[220px]",
        {
          "ml-0 lg:ml-0": !open,
        },
      )}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
