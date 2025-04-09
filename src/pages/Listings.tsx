
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ListingsGrid from '@/components/listings/ListingsGrid';
import ListingDialog from '@/components/listings/ListingDialog';
import { wasteService } from '@/services/api';

const Listings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
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
          <ListingDialog onSuccess={() => setActiveTab('all')} />
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
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Listings</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            {/* <TabsTrigger value="my-listings">My Listings</TabsTrigger> */}
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <ListingsGrid 
              queryFn={wasteService.getAllListings} 
              queryKey="all-listings"
            />
          </TabsContent>
          
          <TabsContent value="available" className="space-y-4">
            <ListingsGrid 
              queryFn={wasteService.getAvailableListings} 
              queryKey="available-listings"
              emptyTitle="No Available Listings"
              emptyDescription="There are currently no e-waste items available. Check back later or create your own listing."
            />
          </TabsContent>
          
          {/* <TabsContent value="my-listings" className="space-y-4">
            <ListingsGrid 
              queryFn={wasteService.getMyListings} 
              queryKey="my-listings"
              emptyTitle="You Haven't Created Any Listings"
              emptyDescription="Start listing your electronic waste items for recycling or reuse."
            />
          </TabsContent> */}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Listings;