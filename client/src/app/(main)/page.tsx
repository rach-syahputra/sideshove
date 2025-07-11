import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="max-w-[1400px] h-screen  mx-auto px-4 py-8">
      <div className="flex gap-2 flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold">Simplify How You Get Paid</h1>
        <p className="text-gray-600 text-lg">
          Create and send secure payment requests to your customers in seconds.
        </p>
        <Button asChild className="text-lg mt-2 h-11">
          <Link href="/merchant/once_off_payment_request">
            Create Payment Request
          </Link>
        </Button>
      </div>
    </section>
  );
}
