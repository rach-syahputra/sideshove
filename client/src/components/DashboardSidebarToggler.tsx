"use client";

import { AlignJustify, X } from "lucide-react";

import { useDashboardSidebarContext } from "@/context/DashboardSidebarContext";

const DashboardSidebarToggler = () => {
  const { open, setOpen } = useDashboardSidebarContext();

  return open ? (
    <button onClick={() => setOpen(false)}>
      <X className="w-5 cursor-pointer" />
    </button>
  ) : (
    <button onClick={() => setOpen(true)}>
      <AlignJustify className="w-5 cursor-pointer" />
    </button>
  );
};

export default DashboardSidebarToggler;
