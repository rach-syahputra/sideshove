import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <main>
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex mb-6 flex-col items-center justify-center">
          <h1 className="text-lg font-semibold">Featured Products</h1>
          <p className="text-gray-600 text-sm">Shop Now</p>
        </div>
        <ProductGrid />
      </section>
    </main>
  );
}
