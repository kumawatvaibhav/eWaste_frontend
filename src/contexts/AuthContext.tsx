
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authService } from '../services/api';

// Types
type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pendingVerification: boolean;
  currentEmail: string;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [tempUserData, setTempUserData] = useState<any>(null);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          console.log('User authenticated:', currentUser);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Clear any invalid auth data
        localStorage.removeItem('ewaste-token');
        localStorage.removeItem('ewaste-user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting login for:', email);
      const response = await authService.login(email, password);
      console.log('Login successful, response:', response);
      
      if (response.user) {
        setUser(response.user);
        toast.success('Login successful! Welcome back.');
        navigate('/dashboard');
      } else {
        throw new Error('Failed to retrieve user data after login');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please check your credentials and try again.';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log('Attempting registration for:', email);
      const response = await authService.register(name, email, password);
      
      console.log('Registration API response:', response);
      
      // Store email for OTP verification
      setCurrentEmail(email);
      
      // Store temporary user data
      setTempUserData(response);
      
      // Set verification pending
      setPendingVerification(true);
      
      toast.success('Registration initiated! Please verify your account with the OTP sent to your email.');
      navigate('/verify-otp');
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // OTP verification function
  const verifyOtp = async (otp: string) => {
    setIsLoading(true);
    try {
      console.log('Verifying OTP for:', currentEmail);
      const response = await authService.verifyOtp(currentEmail, otp);
      
      console.log('OTP verification response:', response);
      
      if (response.success && tempUserData) {
        // Complete registration process
        if (tempUserData.token) {
          // Store token and user data
          localStorage.setItem('ewaste-token', tempUserData.token);
          
          // Extract and store user data
          const userData = {
            id: tempUserData.userId || tempUserData.user?.id || 'unknown',
            name: tempUserData.name || tempUserData.user?.name || currentEmail.split('@')[0],
            email: currentEmail,
            role: tempUserData.role || tempUserData.user?.role || 'user'
          };
          
          localStorage.setItem('ewaste-user', JSON.stringify(userData));
          setUser(userData);
        }
        
        // Reset verification state
        setPendingVerification(false);
        setTempUserData(null);
        setCurrentEmail('');
        
        toast.success('Account verified successfully! Welcome to eWaste.');
        navigate('/dashboard');
      } else {
        toast.error('OTP verification failed. Please try again.');
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'OTP verification failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
    toast.info('You have been logged out');
    navigate('/');
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    pendingVerification,
    currentEmail,
    login,
    register,
    verifyOtp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
