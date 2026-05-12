import { createContext } from 'react';

// DummyJSON
export interface Product {
  id: number | string;
  title: string;
  price: number;
  thumbnail: string;
}

// Cart Items
export interface CartItem extends Product {
  productId: number;
  quantity: number;
}

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  setCart: () => {},
});
