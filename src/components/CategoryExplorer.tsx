
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { getProductsByCategory } from '../data/products';

const categories = [
  { id: 'home', name: 'Home Decor', icon: '🏠' },
  { id: 'furniture', name: 'Furniture', icon: '🪑' },
  { id: 'electronics', name: 'Electronics', icon: '🔌' },
  { id: 'kitchen', name: 'Kitchen', icon: '🍽️' },
  { id: 'bath', name: 'Bath', icon: '🛁' }
];

const CategoryExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('home');

  const productCount = (categoryId: string) => {
    return getProductsByCategory(categoryId).length;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`p-4 rounded-lg transition-all ${
                activeCategory === category.id 
                  ? 'bg-navy text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-medium">{category.name}</div>
              <div className="text-sm mt-1">
                {productCount(category.id)} products
              </div>
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {getProductsByCategory(activeCategory).map((product) => (
            <Card key={product.id} className="overflow-hidden h-full">
              <Link to={`/products/${product.id}`}>
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-navy font-semibold mt-1">${product.price.toFixed(2)}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/products" 
            className="inline-block bg-teal hover:bg-teal/90 text-white px-6 py-3 rounded-lg font-medium"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryExplorer;
