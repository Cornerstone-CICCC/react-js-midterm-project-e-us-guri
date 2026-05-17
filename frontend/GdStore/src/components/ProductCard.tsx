import { Link } from "react-router-dom";
import { type Product } from "../data/CleatsData";

export const ProductCard = (product: Product) => {
  return (
    <Link
      to={`/shop/${product.id}`}
      className="group block relative bg-surface-container-low border border-outline-variant/20 rounded-xl overflow-hidden transition-all hover:border-primary-container/50"
    >
      {product.tag && (
        <div className="absolute top-4 left-4 z-10 bg-primary-container text-white px-3 py-1 font-label-bold text-[10px] uppercase italic skew-badge shadow-md">
          {product.tag}
        </div>
      )}

      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5 space-y-1">
        <p className="text-[10px] text-on-surface-variant font-label-bold uppercase tracking-widest">
          {product.type}
        </p>

        <h3 className="font-headline-lg text-xl text-on-surface italic uppercase tracking-tighter group-hover:text-primary-container transition-colors">
          {product.name}
        </h3>

        <p className="font-headline-xl text-2xl text-primary-container">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};