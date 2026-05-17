import { Sidebar } from "../components/Sidebar";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

export default function ArtificialGrass() {
  const { products, loading, error } = useProducts("artificial-grass");

  return (
    <div className="bg-background text-on-background min-h-screen pt-24">
      <main className="flex flex-col md:flex-row px-margin-desktop py-8 gap-gutter max-w-[1600px] mx-auto">
        <div className="md:w-64 flex-shrink-0">
          <Sidebar />
        </div>

        <section className="flex-1 space-y-8">
          <div className="border-b border-outline-variant/30 pb-6">
            <h1 className="font-headline-xl text-primary italic uppercase text-4xl">
              Artificial Grass Cleats
            </h1>
            <p className="text-on-surface-variant font-label-bold">
              {loading
                ? "Loading cleats…"
                : `Showing ${products.length} cleats`}
            </p>
          </div>

          {error && (
            <p className="text-primary-container font-label-bold">{error}</p>
          )}

          {!loading && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center py-12 border border-dashed border-outline-variant/30 rounded-xl">
                <p className="text-on-surface-variant font-body-lg">
                  No artificial grass cleats found.
                </p>
              </div>
            )
          )}
        </section>
      </main>
    </div>
  );
}
