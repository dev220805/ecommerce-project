
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, MinusCircle, PlusCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      toast.success("Order placed successfully! Thank you for your purchase.");
      setIsCheckingOut(false);
    }, 2000);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container-custom py-16 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="text-center py-16">
          <p className="text-xl text-gray-500 mb-8">Your cart is empty</p>
          <Button asChild>
            <Link to="/products" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-16 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="hidden md:grid grid-cols-12 gap-4 mb-4 text-sm font-medium text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>
            
            <Separator className="mb-6" />
            
            {cartItems.map((item) => (
              <div key={item.product.id} className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product */}
                  <div className="col-span-6 flex items-center space-x-4">
                    <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <Link 
                        to={`/products/${item.product.id}`} 
                        className="font-medium text-gray-900 hover:text-navy"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.product.category}
                      </p>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2 text-center">
                    <p className="md:hidden text-sm text-gray-500 mb-1">Price:</p>
                    <p className="font-medium">${item.product.price.toFixed(2)}</p>
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-2 flex justify-center items-center">
                    <p className="md:hidden text-sm text-gray-500 mr-2">Quantity:</p>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <MinusCircle size={14} />
                      </Button>
                      
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <PlusCircle size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                    <p className="md:hidden text-sm text-gray-500">Total:</p>
                    <div className="flex items-center space-x-4">
                      <p className="font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator className="mt-6" />
              </div>
            ))}
            
            <div className="flex justify-between items-center">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button asChild variant="ghost">
                <Link to="/products" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <Separator className="mb-4" />
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>
            </div>
            
            <Separator className="mb-4" />
            
            <div className="flex justify-between mb-6">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-bold text-navy">
                ${(getCartTotal() + getCartTotal() * 0.1).toFixed(2)}
              </span>
            </div>
            
            <Button 
              className="w-full bg-navy hover:bg-navy/90 gap-2"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                "Processing..."
              ) : (
                <>
                  Checkout
                  <ArrowRight size={16} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
