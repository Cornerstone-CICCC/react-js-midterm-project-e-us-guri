import React from "react";
import { cleatsData } from "../../data/CleatsData";

interface ProductListProps {
  onSelectProduct: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  onSelectProduct,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
      {cleatsData.map((cleat) => (
        <div
          key={cleat.id}
          onClick={() => onSelectProduct(cleat.id)}
          className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20 cursor-pointer group hover:border-primary-container/50 transition-all"
        >
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={cleat.image}
              alt={cleat.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="p-4">
            <h3 className="font-headline-lg text-xl text-on-surface uppercase italic">
              {cleat.name}
            </h3>

            <p className="text-primary font-bold">
              ${cleat.price.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;