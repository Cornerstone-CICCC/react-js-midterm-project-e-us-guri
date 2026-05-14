import { MdAddShoppingCart } from "react-icons/md";

interface ProductProps {
  name: string;
  type: string;
  price: number;
  image: string;
  tag?: string;
}

export function ProductCard({ name, type, price, image, tag }: ProductProps) {
  return (
    <div className="group relative bg-surface-container-high rounded-xl overflow-hidden shadow-2xl transition-all hover:-translate-y-2 border-t border-l border-white/5">
      {tag && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-primary-container text-white font-label-bold px-3 py-1 -skew-x-12 text-xs uppercase italic inline-block">
            {tag}
          </span>
        </div>
      )}
      <div className="aspect-[4/5] relative overflow-hidden bg-surface-container-highest">
        <img
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
          src={image}
          alt={name}
        />
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h4 className="font-headline-lg text-headline-lg-mobile text-on-surface leading-tight">
            {name}
          </h4>
          <p className="text-primary-container font-label-bold italic">{type}</p>
        </div>
        <div className="flex items-center justify-between border-t border-outline-variant/20 pt-4">
          <span className="font-headline-lg text-on-surface">${price}</span>
          <button className="bg-primary-container text-white font-label-bold uppercase px-4 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            Quick Add <MdAddShoppingCart className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}