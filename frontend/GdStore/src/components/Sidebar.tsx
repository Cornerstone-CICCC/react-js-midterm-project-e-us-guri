import { MdTune } from "react-icons/md";
import type { Category } from "../services/productsService";

const GROUND_TYPES: { value: Category; label: string }[] = [
  { value: "artificial-grass", label: "Artificial Grass" },
  { value: "natural-grass", label: "Natural Grass" },
  { value: "futsal", label: "Futsal" },
];

export interface FilterState {
  brands: string[];
  size: string | null;
  groundType: Category | null;
  maxPrice: number;
}

interface SidebarProps {
  availableBrands: string[];
  availableSizes: string[];
  priceBounds: { min: number; max: number };
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
}

export function Sidebar({
  availableBrands,
  availableSizes,
  priceBounds,
  filters,
  onChange,
  onReset,
}: SidebarProps) {
  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  };

  const setGroundType = (g: Category) => {
    onChange({
      ...filters,
      groundType: filters.groundType === g ? null : g,
    });
  };

  const setSize = (s: string) => {
    onChange({ ...filters, size: filters.size === s ? null : s });
  };

  return (
    <aside className="w-full md:w-64 flex flex-col gap-8 shrink-0">
      <div className="flex flex-col gap-6 bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-lg text-headline-lg-mobile text-primary italic uppercase">
            Filters
          </h2>
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary uppercase tracking-widest font-label-bold cursor-pointer"
          >
            <MdTune /> Reset
          </button>
        </div>

        {/* Ground Type */}
        <div className="flex flex-col gap-3">
          <h3 className="font-label-bold uppercase tracking-widest text-on-surface text-xs">
            Field Type
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {GROUND_TYPES.map((g) => {
              const active = filters.groundType === g.value;
              return (
                <button
                  key={g.value}
                  onClick={() => setGroundType(g.value)}
                  className={`py-2 px-3 border text-xs font-label-bold rounded transition-all -skew-x-12 cursor-pointer ${
                    active
                      ? "border-primary-container bg-primary-container text-white"
                      : "border-outline-variant text-on-surface hover:border-primary"
                  }`}
                >
                  <span className="inline-block skew-x-12">{g.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Brand */}
        {availableBrands.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="font-label-bold uppercase tracking-widest text-on-surface text-xs">
              Brand
            </h3>
            <div className="flex flex-col gap-2">
              {availableBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-5 h-5 rounded border-outline bg-surface-container text-primary-container focus:ring-primary-container"
                  />
                  <span className="text-body-md group-hover:text-primary transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Size */}
        {availableSizes.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="font-label-bold uppercase tracking-widest text-on-surface text-xs">
              Size (US)
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {availableSizes.map((size) => {
                const active = filters.size === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSize(size)}
                    className={`p-2 border text-xs font-label-bold rounded transition-all cursor-pointer ${
                      active
                        ? "border-primary-container bg-primary-container/10 text-primary"
                        : "border-outline-variant hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price Range */}
        <div className="flex flex-col gap-3">
          <h3 className="font-label-bold uppercase tracking-widest text-on-surface text-xs">
            Max Price
          </h3>
          <input
            type="range"
            min={priceBounds.min}
            max={priceBounds.max}
            value={filters.maxPrice}
            onChange={(e) =>
              onChange({ ...filters, maxPrice: Number(e.target.value) })
            }
            className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container"
          />
          <div className="flex justify-between text-xs text-on-surface-variant font-label-bold">
            <span>${priceBounds.min}</span>
            <span className="text-primary font-bold">${filters.maxPrice}</span>
            <span>${priceBounds.max}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
