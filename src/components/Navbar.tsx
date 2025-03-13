
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { getCartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const cartCount = getCartCount();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-navy">StyleHaven</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-navy font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-navy font-medium transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-navy font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-navy font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Cart and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-navy" aria-label="Search">
              <Search size={20} />
            </button>
            
            <Link to="/cart" className="text-gray-700 hover:text-navy relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-coral text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                  {cartCount}
                </Badge>
              )}
            </Link>
            
            <button
              className="md:hidden text-gray-700 hover:text-navy"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t mt-4 animate-fade-in">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block text-gray-700 hover:text-navy font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block text-gray-700 hover:text-navy font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block text-gray-700 hover:text-navy font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block text-gray-700 hover:text-navy font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
