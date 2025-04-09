
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { wasteService, reviewService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { ReviewFormData } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ReviewFormProps {
  onSuccess: () => void;
}

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  rating: z.coerce.number().min(1, "Please select a rating").max(5, "Maximum rating is 5 stars"),
  comment: z.string().min(10, "Comment must be at least 10 characters").max(500, "Comment cannot exceed 500 characters"),
  listingId: z.string().optional(),
});

const ReviewForm: React.FC<ReviewFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  
  const { data: listingData, isLoading: isLoadingListings } = useQuery({
    queryKey: ['all-listings'],
    queryFn: wasteService.getAllListings,
  });

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      rating: 0,
      comment: '',
      listingId: undefined,
    },
  });

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    form.setValue('rating', rating);
  };

  const onSubmit = async (data: ReviewFormData) => {
    if (!user) {
      toast.error('You must be logged in to submit a review');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const reviewData = {
        ...data,
        userId: user.id,
        userName: user.name,
      };
      
      await reviewService.createReview(reviewData);
      form.reset();
      setSelectedRating(0);
      onSuccess();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title for your review" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="listingId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Waste Item (Optional)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an e-waste item" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingListings ? (
                    <SelectItem value="loading" disabled>Loading items...</SelectItem>
                  ) : listingData && listingData.length > 0 ? (
                    listingData.map((listing: any) => (
                      <SelectItem key={listing._id} value={listing._id}>
                        {listing.title}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>No items available</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingClick(rating)}
                      className="focus:outline-none"
                    >
                      <Star 
                        className={`w-6 h-6 ${
                          rating <= selectedRating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Comment</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Share your experience" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Review'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReviewForm;