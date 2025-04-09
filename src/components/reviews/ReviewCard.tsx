
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Review } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Star, StarHalf, StarOff } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarOff key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{review.title || 'Review'}</h3>
            <div className="flex space-x-1 mt-1">
              {renderStars(review.rating)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4">
          {review.comment}
        </p>
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between items-center text-xs text-muted-foreground">
        <span>By {review.userName}</span>
        <span>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</span>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;