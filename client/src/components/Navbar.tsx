import Link from "next/link";

import DashboardSidebarToggler from "./DashboardSidebarToggler";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow">
      <div className="mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <DashboardSidebarToggler />
          <Link href="/" className="font-bold select-none">
            SIDESHOV
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
