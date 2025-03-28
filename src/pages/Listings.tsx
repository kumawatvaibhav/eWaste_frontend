
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, Package, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ListingsGrid from '@/components/listings/ListingsGrid';

const Listings: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold">E-Waste Listings</h2>
            <p className="text-muted-foreground">
              Browse and manage electronic waste items available for recycling or reuse
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>Create Listing</span>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 my-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              className="pl-10" 
              placeholder="Search listings by title, category, or location..." 
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Listings</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <ListingsGrid />
          </TabsContent>
          
          <TabsContent value="available" className="space-y-4">
            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Available Listings</h3>
              <p className="text-muted-foreground mb-4">
                There are currently no e-waste items available. Check back later or create your own listing.
              </p>
              <Button>Create a Listing</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="my-listings" className="space-y-4">
            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">You Haven't Created Any Listings</h3>
              <p className="text-muted-foreground mb-4">
                Start listing your electronic waste items for recycling or reuse.
              </p>
              <Button>Create Your First Listing</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Listings;
