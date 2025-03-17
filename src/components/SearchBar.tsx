
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products } from '../data/products';

const SearchBar = ({ className = '' }: { className?: string }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
      setSearchQuery('');
    }
  };

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
    setShowResults(false);
    setSearchQuery('');
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim().length > 0) {
      setShowResults(true);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(e.target.value.trim().length > 0);
            }}
            onFocus={handleSearchFocus}
            className="pr-8 w-full dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setShowResults(false);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <Button type="submit" variant="ghost" className="ml-1 dark:text-white">
          <Search size={20} />
        </Button>
      </form>

      {showResults && filteredProducts.length > 0 && (
        <div 
          className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-[300px] overflow-y-auto"
          onMouseDown={(e) => e.preventDefault()} // Prevents blur event from firing before click
        >
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 mr-3 overflow-hidden rounded">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium dark:text-white">{product.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{product.category}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="p-2 text-center bg-gray-50 dark:bg-gray-900">
            <button 
              className="text-sm text-teal dark:text-teal-300"
              onClick={() => {
                if (searchQuery.trim()) {
                  navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                  setShowResults(false);
                }
              }}
            >
              View all results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
