import { ReactNode } from "react";

import { TransactionProvider } from "@/context/TransactionContext";
import Navbar from "@/components/Navbar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <TransactionProvider>{children}</TransactionProvider>
    </>
  );
};

export default MainLayout;
