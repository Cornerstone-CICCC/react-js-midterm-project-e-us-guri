import { Sidebar } from "../components/Sidebar";
import { ProductCard } from "../components/ProductCard";

const mockProducts = [
  { id: 1, name: "VAPOR STRIKE X1", type: "Firm Ground / Pro Spec", price: 249.99, tag: "Limited Edition", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFMF5fO39DBZ_n4xaSzHo11ty-7CyC5-efF1fYGDf7S_7csaL5sq7hpDeIv9ch_TbHgQcogAYKL9yFWvFcL7j0GzN1f7n8hxzgb2SX3-AUWJE8ax3SCb6icAcXLW_9j_3MBDyM_xzUo0HpIQDq9Q-VLtmMHI0pFUNjsmDKNy_EfS8YSx-XBB6Q33PYJxJBzu5Q_vic-F1b8PLOyuxMDLCrvkmvAHXYDliZ2Rp-9bC_lEj4W43-eOhte3BtlHEsDEbckosJlCagBYeW" },
  { id: 2, name: "APEX PREDATOR", type: "Soft Ground / Elite Control", price: 280.00, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-kORWorxWV0bchGwK1nJkMgvxk1XIuBlX_ga_579WFut4_tQ0BpMukqkaYGTfahx8_iyKgsN9_j5qQObLHkn0bPU6bNOYbAGT8NGrA6YrEQIU9ECtFDg1V9HuBVWmgIjf4hTLJcZkubJMF2zQhQVwCquvn_ktngFRsA8EXLHh7dFGxTrk3grsBtkIkdOr47uRcVW8BDcESzbL7Kp0jZwVhdZKqY1OaLWcaM8DFU4RNGg1cV6kOLlVM9ky872naC_nYKZxebSjKKI6" },
  // ... adicione os outros produtos aqui
];

export default function BrowseCleats() {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <main className="flex flex-col md:flex-row px-margin-mobile md:px-margin-desktop py-8 gap-gutter">
        <Sidebar />

        <section className="flex-1">
          <div className="flex flex-col gap-gutter">
            <div className="flex justify-between items-end border-b border-outline-variant/30 pb-4">
              <div>
                <h1 className="font-headline-xl text-primary italic uppercase">Elite Performance</h1>
                <p className="text-on-surface-variant font-label-bold">Showing {mockProducts.length} technical silhouettes</p>
              </div>
              
              <div className="hidden md:flex gap-4 items-center">
                <span className="text-label-bold text-on-surface">Sort By:</span>
                <select className="bg-transparent border-none text-label-bold text-primary-container focus:ring-0 cursor-pointer">
                  <option className="bg-surface-container">Newest Arrivals</option>
                  <option className="bg-surface-container">Price: High to Low</option>
                  <option className="bg-surface-container">Most Popular</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}