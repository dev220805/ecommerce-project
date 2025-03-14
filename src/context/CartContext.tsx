
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';
import { toast } from 'sonner';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartItemsCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<any>(null);

  // Check for user session on mount and listen for auth changes
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    getInitialSession();
    
    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      
      // Clear cart on logout
      if (event === 'SIGNED_OUT') {
        setCartItems([]);
      }
    });
    
    // Cleanup
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const addToCart = (product: Product, quantity = 1) => {
    // Check if user is authenticated
    if (!user) {
      toast.error('Please log in to add items to your cart', {
        description: 'Your shopping experience is waiting for you after login!',
        action: {
          label: 'Login',
          onClick: () => window.location.href = '/auth'
        }
      });
      return;
    }
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        toast.success(`Updated ${product.name} quantity in cart`);
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast.info(`Removed ${itemToRemove.product.name} from cart`);
      }
      return prevItems.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Calculate the cart items count
  const cartItemsCount = getCartCount();

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemsCount,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
