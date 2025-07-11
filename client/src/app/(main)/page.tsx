import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="mx-auto h-screen max-w-[1400px] px-4 py-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-semibold">Simplify How You Get Paid</h1>
        <p className="text-lg text-gray-600">
          Create and send secure payment requests to your customers in seconds.
        </p>
        <Button asChild className="mt-2 h-11 text-lg">
          <Link href="/merchant/once_off_payment_request">
            Create Payment Request
          </Link>
        </Button>
      </div>
    </section>
  );
}
