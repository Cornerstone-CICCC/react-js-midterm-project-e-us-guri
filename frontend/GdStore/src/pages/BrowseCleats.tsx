import { useMemo, useState } from "react";
import { Sidebar, type FilterState } from "../components/Sidebar";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const DEFAULT_FILTERS: FilterState = {
  brands: [],
  size: null,
  groundType: null,
  maxPrice: Number.POSITIVE_INFINITY,
};

export default function BrowseCleats() {
  const { products, loading, error } = useProducts();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const { availableBrands, availableSizes, priceBounds } = useMemo(() => {
    const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
    const sizes = Array.from(
      new Set(products.flatMap((p) => p.sizes))
    ).sort((a, b) => Number(a) - Number(b));
    const prices = products.map((p) => Number(p.price));
    const min = prices.length ? Math.floor(Math.min(...prices)) : 0;
    const max = prices.length ? Math.ceil(Math.max(...prices)) : 500;
    return {
      availableBrands: brands,
      availableSizes: sizes,
      priceBounds: { min, max },
    };
  }, [products]);

  // When products first load, reset maxPrice to the upper bound so the slider
  // shows everything until the user moves it.
  const effectiveFilters: FilterState = {
    ...filters,
    maxPrice: Number.isFinite(filters.maxPrice)
      ? filters.maxPrice
      : priceBounds.max,
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (
        effectiveFilters.brands.length > 0 &&
        !effectiveFilters.brands.includes(p.brand)
      )
        return false;
      if (
        effectiveFilters.groundType &&
        p.category !== effectiveFilters.groundType
      )
        return false;
      if (effectiveFilters.size && !p.sizes.includes(effectiveFilters.size))
        return false;
      if (Number(p.price) > effectiveFilters.maxPrice) return false;
      return true;
    });
  }, [products, effectiveFilters]);

  return (
    <div className="bg-background text-on-background min-h-screen pt-24">
      <main className="flex flex-col md:flex-row px-margin-desktop py-8 gap-gutter max-w-[1600px] mx-auto">
        <div className="md:w-64 flex-shrink-0">
          <Sidebar
            availableBrands={availableBrands}
            availableSizes={availableSizes}
            priceBounds={priceBounds}
            filters={effectiveFilters}
            onChange={setFilters}
            onReset={() =>
              setFilters({ ...DEFAULT_FILTERS, maxPrice: priceBounds.max })
            }
          />
        </div>

        <section className="flex-1 space-y-8">
          <div className="border-b border-outline-variant/30 pb-6">
            <h1 className="font-headline-xl text-primary italic uppercase text-4xl">
              Elite Performance
            </h1>
            <p className="text-on-surface-variant font-label-bold">
              {loading
                ? "Loading silhouettes…"
                : `Showing ${filtered.length} of ${products.length} silhouettes`}
            </p>
          </div>

          {error && (
            <p className="text-primary-container font-label-bold">{error}</p>
          )}

          {!loading && filtered.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-outline-variant/30 rounded-xl">
              <p className="text-on-surface-variant font-body-lg">
                No cleats match your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {filtered.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
