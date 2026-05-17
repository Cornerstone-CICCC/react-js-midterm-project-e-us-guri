import { Sidebar } from "../components/Sidebar";
import { ProductCard } from "../components/ProductCard";
import { cleatsData } from "../data/CleatsData";

export default function Futsal() {
  const futsalCleats = cleatsData.filter(
    (product) => product.type === "Futsal"
  );

  return (
    <div className="bg-background text-on-background min-h-screen pt-24">
      <main className="flex flex-col md:flex-row px-margin-desktop py-8 gap-gutter max-w-[1600px] mx-auto">
        <div className="md:w-64 flex-shrink-0">
          <Sidebar />
        </div>
        <section className="flex-1 space-y-8">
          <div className="border-b border-outline-variant/30 pb-6">
            <h1 className="font-headline-xl text-primary italic uppercase text-4xl">
              Futsal Cleats
            </h1>
            <p className="text-on-surface-variant font-label-bold">
              Showing {futsalCleats.length} cleats...
            </p>
          </div>

          {futsalCleats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {futsalCleats.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-outline-variant/30 rounded-xl">
              <p className="text-on-surface-variant font-body-lg">
                No futsal cleats found.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}