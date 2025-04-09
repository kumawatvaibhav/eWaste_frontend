
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Review } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ReviewCard from './ReviewCard';
import { MessageSquare, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddReviewDialog from './AddReviewDialog';

interface ReviewListProps {
  queryFn: () => Promise<Review[]>;
  queryKey: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ 
  queryFn, 
  queryKey,
  emptyTitle = "No Reviews Found",
  emptyDescription = "There are no reviews to display at this time."
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Reviews</h3>
          <p className="text-red-600">
            {error instanceof Error ? error.message : 'Failed to load reviews. Please try again later.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (data.length == null || data.length > 0) {
    return (
      <Card className="border-dashed border-2 bg-gray-50">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center">
          <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{emptyTitle}</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            {emptyDescription}
          </p>
          <AddReviewDialog 
            trigger={
              <Button className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                <span>Add Review</span>
              </Button>
            }
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <ScrollArea className="max-h-[calc(100vh-300px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(data) && data.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ReviewList;