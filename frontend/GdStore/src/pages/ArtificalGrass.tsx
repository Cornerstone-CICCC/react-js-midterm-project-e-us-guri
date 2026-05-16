import { Sidebar } from "../components/Sidebar";
import { ProductCard } from "../components/ProductCard";
import { cleatsData } from "../data/CleatsData";

export default function ArtificialGrass() {
  const artificialGrassCleats = cleatsData.filter(
    (product) => product.type === "Artificial grass"
  );

  return (
    <div className="bg-background text-on-background min-h-screen pt-24">
      <main className="flex flex-col md:flex-row px-margin-desktop py-8 gap-gutter max-w-[1600px] mx-auto">
        
        {/* SIDEBAR FILTERS */}
        <div className="md:w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        {/* PRODUCTS SECTION */}
        <section className="flex-1 space-y-8">
          
          {/* HEADER DA CATEGORIA */}
          <div className="border-b border-outline-variant/30 pb-6">
            <h1 className="font-headline-xl text-primary italic uppercase text-4xl">
              Artificial Grass Cleats
            </h1>
            <p className="text-on-surface-variant font-label-bold">
              Showing {artificialGrassCleats.length} cleats...
            </p>
          </div>
          
          {/* GRID DE PRODUTOS FILTRADOS */}
          {artificialGrassCleats.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {artificialGrassCleats.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-outline-variant/30 rounded-xl">
              <p className="text-on-surface-variant font-body-lg">
                No artificial grass cleats found.
              </p>
            </div>
          )}
          
        </section>
      </main>
    </div>
  );
}