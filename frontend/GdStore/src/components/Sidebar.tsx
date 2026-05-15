import { MdTune } from "react-icons/md";

export function Sidebar() {
  const brands = ["Nike", "Adidas", "Puma"];
  const groundTypes = ["Artificial Grass", "Natural Grass", "Futsal"];
  const sizes = ["8", "9", "10", "11", "12"];
  const genres = ["Childish", "Adult"];

  return (
    <aside className="w-full md:w-64 flex flex-col gap-8 shrink-0">
      <div className="flex flex-col gap-6 bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-lg text-headline-lg-mobile text-primary italic uppercase">Filters</h2>
          <MdTune className="text-secondary text-xl" />
        </div>
        


        {/* Brand */}
        <div className="flex flex-col gap-3">
          <h3 className="font-label-bold text-label-bold uppercase tracking-widest text-on-surface">Brand</h3>
          <div className="flex flex-col gap-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="w-5 h-5 rounded border-outline bg-surface-container text-primary-container focus:ring-primary-container"
                  type="checkbox"
                />
                <span className="text-body-md group-hover:text-primary transition-colors">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Ground Type */}
        <div className="flex flex-col gap-3">
          <h3 className="font-label-bold text-label-bold uppercase tracking-widest text-on-surface">Ground Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {groundTypes.map((type) => (
              <button
                key={type}
                className="py-2 px-3 border border-outline-variant text-label-bold rounded hover:bg-primary-container hover:text-white transition-all -skew-x-12"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Genre */}
        <div className="flex flex-col gap-3">
          <h3 className="font-label-bold text-label-bold uppercase tracking-widest text-on-surface">Genre</h3>
          <div className="grid grid-cols-2 gap-2">
            {genres.map((genres) => (
              <button
                key={genres}
                className="py-2 px-3 border border-outline-variant text-label-bold rounded hover:bg-primary-container hover:text-white transition-all -skew-x-12"
              >
                {genres}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="flex flex-col gap-3">
          <h3 className="font-label-bold text-label-bold uppercase tracking-widest text-on-surface">Size (US)</h3>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`p-2 border text-label-bold rounded transition-all ${
                  size === "10" 
                    ? "border-primary-container bg-primary-container/10 text-primary" 
                    : "border-outline-variant hover:border-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-3">
          <h3 className="font-label-bold text-label-bold uppercase tracking-widest text-on-surface">Price Range</h3>
          <input
            className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container"
            type="range"
            min="50"
            max="350"
          />
          <div className="flex justify-between text-label-bold text-on-surface-variant">
            <span>$50</span>
            <span>$350</span>
          </div>
        </div>
      </div>
    </aside>
  );
}