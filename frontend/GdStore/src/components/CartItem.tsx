import { MdAdd, MdRemove, MdDelete } from "react-icons/md";

interface CartItemProps {
  name: string;
  category: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  borderClass?: string;
}

const CartItem = ({ name, category, price, image, size, quantity, borderClass = "border-primary-container" }: CartItemProps) => (
  <div className={`group relative bg-surface-container border-l-4 ${borderClass} p-6 shadow-xl transition-all duration-300 hover:bg-surface-container-high flex flex-col md:flex-row gap-6`}>
    <div className="w-full md:w-48 h-48 bg-surface-container-highest overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline-lg text-on-surface italic uppercase">{name}</h3>
            <p className="text-on-surface-variant text-sm font-label-bold uppercase tracking-widest mt-1">{category}</p>
          </div>
          <p className="font-headline-lg text-primary-container">${price.toFixed(2)}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="bg-surface-container-highest px-3 py-1 flex items-center gap-4 rounded-lg">
            <button className="text-primary-container hover:text-primary transition-colors"><MdRemove /></button>
            <span className="font-label-bold text-on-surface">{quantity}</span>
            <button className="text-primary-container hover:text-primary transition-colors"><MdAdd /></button>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant font-label-bold uppercase text-xs">
            Size: {size}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button className="flex items-center gap-2 text-on-surface-variant hover:text-error transition-colors font-label-bold text-xs uppercase">
          <MdDelete className="text-lg" /> Remove Item
        </button>
      </div>
    </div>
  </div>
);

export default CartItem;