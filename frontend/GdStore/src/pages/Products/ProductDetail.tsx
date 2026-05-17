import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { cleatsData } from "../../data/CleatsData";
import { MdBolt, MdShoppingBag } from "react-icons/md";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("10");

  const product = cleatsData.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="p-20 text-on-surface">
        Product not found.
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-margin-desktop bg-background min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="text-primary-container font-label-bold uppercase text-xs mb-8 flex items-center gap-2"
      >
        ← Back to Inventory
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-7">
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
            <img
              src={product.image}
              className="w-full h-full object-cover"
              alt={product.name}
            />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <header>
            <h1 className="font-headline-xl text-6xl text-on-surface uppercase italic leading-none">
              {product.name}
            </h1>

            <p className="font-headline-lg text-3xl text-primary mt-4">
              ${product.price.toFixed(2)}
            </p>
          </header>

          <div className="pt-8 border-t border-outline-variant/30 space-y-4">
            <h3 className="font-label-bold text-on-surface uppercase tracking-widest text-sm">
              Description
            </h3>

            <p className="text-on-surface-variant leading-relaxed">
              {product.description}
            </p>

            <ul className="grid grid-cols-2 gap-4">
              {product.specs.map((spec, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-on-surface text-[12px] font-bold uppercase"
                >
                  <MdBolt className="text-primary" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-label-bold text-on-surface uppercase tracking-widest text-sm">
              Select Size
            </h3>

            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 border-2 font-bold transition-all ${
                    selectedSize === size
                      ? "border-primary-container bg-primary-container text-white"
                      : "border-outline-variant text-on-surface hover:border-primary-container"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-primary-container text-white py-5 font-headline-lg uppercase italic shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
            Add to Cart <MdShoppingBag size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}