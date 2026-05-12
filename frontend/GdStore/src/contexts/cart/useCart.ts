import { useContext } from 'react';
import { CartContext } from './CartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw Error('useCart must be used inside the CarttContextProvider');
  return context;
};
