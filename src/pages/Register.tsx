
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, ShieldCheck, BarChart } from 'lucide-react';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';

const Register: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Visual/Background */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-earth-400 to-earth-600 p-12 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 text-white/80 max-w-md">
            Be part of the solution to electronic waste and make a positive impact on our planet.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Secure and Private</h3>
                <p className="text-white/70">
                  Your data is always protected with our state-of-the-art security measures.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <BarChart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Detailed Analytics</h3>
                <p className="text-white/70">
                  Track your contributions and see the real environmental impact you're making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center mb-10 justify-center md:justify-start">
            <Leaf className="w-8 h-8 text-ewaste-500" />
            <span className="ml-2 font-bold text-xl">
              <span className="text-ewaste-700">e</span>Waste
            </span>
          </Link>
          
          {/* Auth Form */}
          <AuthForm type="register" />
        </div>
      </div>
    </div>
  );
};

export default Register;
