
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface Transaction {
  _id: string;
  userId: string;
  wasteType: string;
  quantity: number;
  unit: string;
  date: string;
  location: string;
  description?: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface EwasteListing {
  _id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  condition: 'new' | 'like new' | 'good' | 'fair' | 'poor';
  quantity: number;
  price?: number;
  location: string;
  images?: string[];
  status: 'available' | 'pending' | 'sold' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface ImpactMetrics {
  co2Saved: number;
  waterSaved: number;
  energySaved: number;
  materialsRecovered: number;
}

export interface Review {
  _id: string;
  userId: string;
  userName: string;
  listingId?: string;
  transitionId?: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  title?: string;
}

export interface ReviewFormData {
  title: string;
  rating: number;
  comment: string;
  listingId?: string;
  transitionId?: string;
}