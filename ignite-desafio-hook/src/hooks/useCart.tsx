import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const stockResponse = await api.get<Stock>(`stock/${productId}`);
      
      const cartProduct = cart.find(cartProduct => cartProduct.id === productId);
      const amount = cartProduct ? cartProduct.amount + 1 : 1;

      const stock = stockResponse.data;
      if(stock.amount < amount) {
        toast.error('Quantidade solicitada fora de estoque');        
        return;
      }

      const productResponse = await api.get(`products/${productId}`);
      const apiProduct = productResponse.data;

      let updatedCart: Product[] = [];
      
      if (cartProduct) {
        updatedCart = cart.map(product => {
          if(product.id === cartProduct.id) {
            return {...product, amount}
          }

          return product;
        });
      } else {
        updatedCart = [...cart, {...apiProduct, amount}];
      }     
      
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      if (!cart.find(product => product.id === productId)) throw new Error();
      
      const filteredCart = cart.filter(product => product.id !== productId);

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(filteredCart));
      setCart(filteredCart);
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try { 
      if (amount <= 0) return;

      const response = await api.get<Stock>(`stock/${productId}`);

      const stock = response.data;

      if(stock.amount < amount) {
        toast.error('Quantidade solicitada fora de estoque');
        return 
      }

      const updatedCart = cart.map(product => {
        if (product.id === productId) {
          return {...product, amount}
        }

        return product;
      });

      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
