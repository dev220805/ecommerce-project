
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const searchQuery = searchParams.get('search') || '';
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'home', name: 'Home Decor' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'bath', name: 'Bath' }
  ];

  // Filter products based on search query and category
  useEffect(() => {
    let result = products;
    
    // Filter by search query if present
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category if not "all"
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="container-custom py-16 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <div className="mb-8">
        <SearchBar className="max-w-xl mx-auto mb-8" />
        
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-navy text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {searchQuery && (
        <div className="mb-6">
          <p className="text-lg">
            Search results for: <span className="font-medium">"{searchQuery}"</span>
            {filteredProducts.length > 0 
              ? ` (${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'} found)`
              : ''
            }
          </p>
        </div>
      )}
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
