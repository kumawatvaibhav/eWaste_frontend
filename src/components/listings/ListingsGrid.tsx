
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { wasteService } from '@/services/api';
import { EwasteListing } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { format } from 'date-fns';
import { Package, MapPin, Calendar } from 'lucide-react';

const ListingsGrid: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['listings'],
    queryFn: wasteService.getAllListings,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600">Failed to load e-waste listings</p>
        <p className="text-sm text-red-500">Please try again later</p>
      </div>
    );
  }

  // Updated to handle the response format from the API
  const listings = data?.data || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing: EwasteListing) => (
            <Card key={listing._id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="h-48 bg-gray-200 relative">
                {listing.images && listing.images.length > 0 ? (
                  <img 
                    src={listing.images[0]} 
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <Badge 
                  className={`absolute top-2 right-2 ${getStatusColor(listing.status)}`}
                >
                  {listing.status}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{listing.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-2 pb-2">
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {listing.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-gray-100">
                    {listing.category}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100">
                    {listing.condition}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100">
                    Qty: {listing.quantity}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Posted {format(new Date(listing.createdAt), 'MMM dd, yyyy')}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button size="sm" className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No E-Waste Listings Found</h3>
          <p className="text-muted-foreground mb-4">
            Be the first to list your electronic waste items for recycling or reuse.
          </p>
          <Button>Create a Listing</Button>
        </div>
      )}
    </div>
  );
};

export default ListingsGrid;
