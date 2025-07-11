import { ReactNode } from "react";

import { DashboardSidebarProvider } from "@/context/DashboardSidebarContext";
import ContentContainer from "@/components/ContentContainer";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardSidebarProvider>
      <Navbar />
      <main className="flex min-h-[calc(100svh-64px)] items-start">
        <DashboardSidebar />
        <ContentContainer>{children}</ContentContainer>
      </main>
    </DashboardSidebarProvider>
  );
};

export default MainLayout;
