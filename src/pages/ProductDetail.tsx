
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MinusCircle, PlusCircle, ShoppingCart, ArrowLeft } from 'lucide-react';
import { getProductById, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const productData = getProductById(parseInt(id));
      if (productData) {
        setProduct(productData);
      }
    }
    setLoading(false);
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="container-custom py-16 min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-16 min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">Sorry, the product you're looking for doesn't exist.</p>
          <Button onClick={goBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-16 min-h-screen">
      <Button 
        variant="ghost" 
        className="mb-8 flex items-center gap-2"
        onClick={goBack}
      >
        <ArrowLeft size={16} />
        Back to Products
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover aspect-square"
          />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="text-2xl font-semibold text-navy mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-gray-600 mb-6">
            {product.description}
          </p>
          
          <Separator className="my-6" />
          
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Quantity</p>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <MinusCircle size={16} />
              </Button>
              
              <span className="w-12 text-center font-medium">{quantity}</span>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                <PlusCircle size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              className="bg-navy hover:bg-navy/90 flex-1 gap-2"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Category</h3>
              <p className="text-gray-600 capitalize">{product.category}</p>
            </div>
            
            <div>
              <h3 className="font-medium">Availability</h3>
              <p className="text-gray-600">
                {product.inventory > 0 
                  ? `In Stock (${product.inventory} available)` 
                  : 'Out of Stock'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
