
import axios from 'axios';
import { toast } from 'sonner';

// Base API URL
const API_URL = import.meta.env.BACKEND_API || "https://googlesolutions-backend.onrender.com";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ewaste-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    const message = error.response?.data?.message || 'An error occurred';
    
    // Show toast notification for errors
    toast.error(message);
    
    // Handle authorization errors
    if (error.response?.status === 401) {
      localStorage.removeItem('ewaste-token');
      localStorage.removeItem('ewaste-user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Authentication service with real API calls
export const authService = {
  login: async (email: string, password: string) => {
    try {
      console.log('Attempting login with real API for:', email);
      
      const response = await api.post('/api/auth/login', { email, password });
      console.log('Login API response:', response.data);
      
      if (response.data.token) {
        // Store token and user data
        localStorage.setItem('ewaste-token', response.data.token);
        
        // Extract and store user data
        const userData = {
          id: response.data.userId || response.data.user?.id || 'unknown',
          name: response.data.name || response.data.user?.name || email.split('@')[0],
          email: email,
          role: response.data.role || response.data.user?.role || 'user'
        };
        
        localStorage.setItem('ewaste-user', JSON.stringify(userData));
        
        return {
          token: response.data.token,
          user: userData
        };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (name: string, email: string, password: string) => {
    try {
      console.log('Attempting registration with real API for:', email);
      
      const response = await api.post('/api/auth/register', { 
        name, 
        email, 
        password 
      });
      
      console.log('Registration API response:', response.data);
      
      // For OTP flow, we don't store anything in localStorage yet
      // We just return the response
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  verifyOtp: async (email: string, otp: string) => {
    try {
      console.log('Verifying OTP for:', email);
      
      const response = await api.post('/api/auth/verify-otp', { 
        email, 
        otp 
      });
      
      console.log('OTP verification API response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('ewaste-token');
    localStorage.removeItem('ewaste-user');
  },
  
  getCurrentUser: () => {
    const user = localStorage.getItem('ewaste-user');
    return user ? JSON.parse(user) : null;
  },
};

// E-waste data service
export const wasteService = {
  getUserStats: async () => {
    try {
      const response = await api.get('/api/waste/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching user stats:', error);
      // Return mock data as fallback
      return {
        totalWaste: 124.5,
        wasteByType: [
          { type: 'Electronics', amount: 45.2 },
          { type: 'Batteries', amount: 12.8 },
          { type: 'Appliances', amount: 66.5 }
        ],
        impactMetrics: {
          co2Saved: 83.2,
          treesPlanted: 15,
          waterSaved: 1240
        }
      };
    }
  },
  
  getWasteTypes: async () => {
    try {
      const response = await api.get('/api/waste/types');
      return response.data;
    } catch (error) {
      console.error('Error fetching waste types:', error);
      // Return mock data as fallback
      return [
        { id: 1, name: 'Electronics', icon: 'laptop' },
        { id: 2, name: 'Batteries', icon: 'battery' },
        { id: 3, name: 'Appliances', icon: 'home' },
        { id: 4, name: 'Light Bulbs', icon: 'lightbulb' }
      ];
    }
  },
  
  addWasteContribution: async (data: any) => {
    const response = await api.post('/api/waste/contribute', data);
    return response.data;
  },
  
  getImpactMetrics: async () => {
    try {
      const response = await api.get('/api/impact/metrics');
      return response.data;
    } catch (error) {
      console.error('Error fetching impact metrics:', error);
      // Return mock data as fallback
      return {
        co2Saved: 83.2,
        treesPlanted: 15,
        waterSaved: 1240,
        energySaved: 320
      };
    }
  },
  
  getLeaderboard: async () => {
    try {
      const response = await api.get('/api/leaderboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Return mock data as fallback
      return [
        { id: 1, name: 'John D.', points: 1240, rank: 1 },
        { id: 2, name: 'Sarah K.', points: 980, rank: 2 },
        { id: 3, name: 'Michael T.', points: 875, rank: 3 },
        { id: 4, name: 'Emma L.', points: 740, rank: 4 },
        { id: 5, name: 'David R.', points: 690, rank: 5 }
      ];
    }
  },
  
  getAllTransitions: async () => {
    try {
      // Updated to match Postman documentation
      const response = await api.get('/api/transition/getAll');
      console.log('Transitions response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching transitions:', error);
      throw error;
    }
  },
  
  getTransitionById: async (id: string) => {
    try {
      // Updated to match Postman documentation
      const response = await api.get(`/api/transition/get/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transition with ID ${id}:`, error);
      throw error;
    }
  },
  
  createTransition: async (data: any) => {
    try {
      // Updated to match Postman documentation
      const response = await api.post('/api/transition/create', data);
      toast.success('Transition recorded successfully');
      return response.data;
    } catch (error) {
      console.error('Error creating transition:', error);
      throw error;
    }
  },
  
  getAllListings: async () => {
    try {
      // Updated to match Postman documentation
      const response = await api.get('/api/eWasteListing/getAll');
      console.log('Listings response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching e-waste listings:', error);
      throw error;
    }
  },
  
  getListingById: async (id: string) => {
    try {
      // Updated to match Postman documentation
      const response = await api.get(`/api/eWasteListing/get/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching listing with ID ${id}:`, error);
      throw error;
    }
  },
  
  createListing: async (data: any) => {
    try {
      // Updated to match Postman documentation
      const response = await api.post('/api/eWasteListing/create', data);
      toast.success('E-waste listing created successfully');
      return response.data;
    } catch (error) {
      console.error('Error creating e-waste listing:', error);
      throw error;
    }
  },
  
  updateListing: async (id: string, data: any) => {
    try {
      // Updated to match Postman documentation
      const response = await api.put(`/api/eWasteListing/update/${id}`, data);
      toast.success('E-waste listing updated successfully');
      return response.data;
    } catch (error) {
      console.error(`Error updating listing with ID ${id}:`, error);
      throw error;
    }
  },
  
  deleteListing: async (id: string) => {
    try {
      // Updated to match Postman documentation
      const response = await api.delete(`/api/eWasteListing/delete/${id}`);
      toast.success('E-waste listing deleted successfully');
      return response.data;
    } catch (error) {
      console.error(`Error deleting listing with ID ${id}:`, error);
      throw error;
    }
  },
};

export default api;
