
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-ewaste-50 border-t border-ewaste-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <Leaf className="w-7 h-7 text-ewaste-500" />
              <span className="font-bold text-xl">
                <span className="text-ewaste-700">e</span>Waste
              </span>
            </div>
            <p className="text-muted-foreground">
              Transforming electronic waste management through innovative solutions that make an impact on our environment.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" className="text-muted-foreground hover:text-ewaste-600 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-ewaste-600 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-muted-foreground hover:text-ewaste-600 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-ewaste-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-ewaste-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-muted-foreground hover:text-ewaste-600 transition-colors">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-ewaste-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-ewaste-600 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-ewaste-500 mt-0.5" />
                <span className="text-muted-foreground">
                  GSFC University
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-ewaste-500" />
                <span className="text-muted-foreground">
                  123456789
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-ewaste-500" />
                <span className="text-muted-foreground">
                  22bt04059@gsfcuniversity.ac.in
                </span>
              </li>
            </ul>
          </div>

          {/* image*/}
          <div>
              <img src="/img-e-waste.jpg" alt="eWaste Logo" className="w-48 h-48 rounded-md items-end" />
          </div>
        </div>

        

        {/* Copyright */}
        <div className="pt-10 mt-10 border-t border-ewaste-100 text-center md:flex md:justify-between md:items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} eWaste Management. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy" className="hover:text-ewaste-600 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-ewaste-600 transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-ewaste-600 transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
