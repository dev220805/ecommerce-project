import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { cartItemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container-custom py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center w-full justify-between md:w-auto mb-4 md:mb-0">
            <Link to="/" className="font-bold text-2xl text-navy">StyleHaven</Link>
            <button
              className="block md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          
          <div className={`${
            mobileMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row items-center gap-4 w-full md:w-auto`}>
            <div className="w-full md:w-72 lg:w-96">
              <SearchBar />
            </div>
            
            <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto mt-4 md:mt-0">
              <Link to="/" className="hover:text-navy transition-colors">Home</Link>
              <Link to="/products" className="hover:text-navy transition-colors">Products</Link>
              <Link to="/cart" className="relative flex items-center">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-coral text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
