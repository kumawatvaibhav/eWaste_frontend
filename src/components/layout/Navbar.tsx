
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X, Leaf, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12',
        isScrolled
          ? 'py-4 bg-white/85 backdrop-blur-md shadow-sm'
          : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="w-8 h-8 text-ewaste-500" />
          <span className="font-bold text-xl hidden sm:inline-block">
            <span className="text-ewaste-700">e</span>Waste
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="animated-link text-foreground/80 hover:text-foreground font-medium">
            Home
          </Link>
          <Link to="/about" className="animated-link text-foreground/80 hover:text-foreground font-medium">
            About
          </Link>
          <Link to="/impact" className="animated-link text-foreground/80 hover:text-foreground font-medium">
            Impact
          </Link>
          <Link to="/contact" className="animated-link text-foreground/80 hover:text-foreground font-medium">
            Contact
          </Link>
        </nav>

        {/* Auth Buttons or User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center space-x-2 border-ewaste-200 hover:border-ewaste-300 hover:bg-ewaste-50">
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={logout}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-ewaste-50 hover:text-ewaste-700">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-ewaste-500 hover:bg-ewaste-600 text-white">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-20 bg-background animate-fade-in">
          <div className="flex flex-col items-center justify-start p-8 space-y-6 h-full">
            <Link 
              to="/" 
              className="text-lg font-medium hover:text-ewaste-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-lg font-medium hover:text-ewaste-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/impact" 
              className="text-lg font-medium hover:text-ewaste-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Impact
            </Link>
            <Link 
              to="/contact" 
              className="text-lg font-medium hover:text-ewaste-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-6 flex flex-col space-y-4 w-full">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-ewaste-500 hover:bg-ewaste-600 text-white">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-ewaste-500 hover:bg-ewaste-600 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
