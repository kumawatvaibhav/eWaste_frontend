
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReviewList from './ReviewList';
import { reviewService } from '@/services/api';
import AddReviewDialog from './AddReviewDialog';

const ReviewTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <p className="text-muted-foreground">
          Browse reviews or share your experience with e-waste items and services
        </p>
        <AddReviewDialog onSuccess={() => setActiveTab('all')} />
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Reviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <ReviewList 
            queryFn={reviewService.getAllReviews} 
            queryKey="all-reviews"
            emptyTitle="No Reviews Yet"
            emptyDescription="Be the first to share your experience with an e-waste item or service."
          />
        </TabsContent>
        
      </Tabs>
    </div>
  );
};

export default ReviewTab;