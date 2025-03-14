
import { Link } from 'react-router-dom';
import { ShoppingCart, LogIn } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current session
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    getCurrentUser();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleGoToLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/auth');
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group h-full flex flex-col">
      <Link to={`/products/${product.id}`} className="flex-grow flex flex-col">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.featured && (
            <span className="absolute top-2 left-2 bg-coral text-white text-xs px-2 py-1 rounded">
              Featured
            </span>
          )}
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-medium text-lg mb-1 text-gray-900">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
          <p className="font-semibold text-navy">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {user ? (
            <Button 
              className="w-full bg-teal hover:bg-teal/90 gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
          ) : (
            <Button 
              className="w-full bg-gray-600 hover:bg-gray-700 gap-2"
              onClick={handleGoToLogin}
            >
              <LogIn size={16} />
              Login to Purchase
            </Button>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
