"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IDashboardSidebarContext {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardSidebarContext = createContext<
  IDashboardSidebarContext | undefined
>(undefined);

const DashboardSidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <DashboardSidebarContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </DashboardSidebarContext.Provider>
  );
};

const useDashboardSidebarContext = (): IDashboardSidebarContext => {
  const context = useContext(DashboardSidebarContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardSidebarContext must be used within a DashboardSidebarProvider",
    );
  }
  return context;
};

export { DashboardSidebarProvider, useDashboardSidebarContext };
