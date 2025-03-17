
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from 'sonner';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { cartItemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getInitialSession();
    
    // Set up auth listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    
    // Cleanup function
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="container-custom py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center w-full justify-between md:w-auto">
            <Link to="/" className="font-bold text-2xl text-navy dark:text-white">StyleHaven</Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                className="block md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="dark:text-white" /> : <Menu className="dark:text-white" />}
              </button>
            </div>
          </div>
          
          {/* Search bar for mobile - always visible below navbar */}
          <div className="md:hidden w-full my-4">
            <SearchBar />
          </div>
          
          {/* Desktop nav and search */}
          <div className={`${
            mobileMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row items-center gap-4 w-full md:w-auto fixed md:static top-0 right-0 h-full md:h-auto bg-white dark:bg-gray-900 p-6 md:p-0 shadow-lg md:shadow-none z-50 transition-transform duration-300 transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:translate-x-0 max-w-[280px] md:max-w-none`}>
            {/* Close button for mobile sliding menu */}
            <button 
              className="absolute top-4 right-4 md:hidden" 
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="dark:text-white" />
            </button>
            
            {/* Search bar for desktop view */}
            <div className="hidden md:block w-full md:w-72 lg:w-96">
              <SearchBar />
            </div>
            
            <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto mt-12 md:mt-0">
              <Link 
                to="/" 
                className="hover:text-navy dark:text-white dark:hover:text-gray-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="hover:text-navy dark:text-white dark:hover:text-gray-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/cart" 
                className="relative flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 dark:text-white" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-coral text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 dark:border-gray-700 dark:text-white"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 dark:border-gray-700 dark:text-white"
                  onClick={() => {
                    navigate('/auth');
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Navbar;
