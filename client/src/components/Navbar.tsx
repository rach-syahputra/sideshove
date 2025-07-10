import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full shadow">
      <div className="flex h-20 max-w-5xl mx-auto px-4 items-center justify-between">
        <Link href="/" className="font-bold">
          SIDESHOV
        </Link>
        <Link href="/merchant/transactions" className="hover:underline">
          Transaction Log
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
