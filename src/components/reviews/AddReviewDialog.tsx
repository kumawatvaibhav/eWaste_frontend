
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useQueryClient } from '@tanstack/react-query';
import ReviewForm from './ReviewForm';

interface AddReviewDialogProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const AddReviewDialog: React.FC<AddReviewDialogProps> = ({ 
  trigger,
  onSuccess 
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const handleSuccess = () => {
    setOpen(false);
    // Invalidate queries to refetch the data
    queryClient.invalidateQueries({ queryKey: ['all-reviews'] });
    queryClient.invalidateQueries({ queryKey: ['my-reviews'] });
    
    if (onSuccess) {
      onSuccess();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>Add Review</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] p-0 overflow-hidden">
        <ScrollArea className="max-h-[85vh]">
          <div className="p-6">
            <DialogHeader className="pb-4">
              <DialogTitle>Share Your Experience</DialogTitle>
              <DialogDescription>
                Tell others about your experience with an e-waste item or service
              </DialogDescription>
            </DialogHeader>
            <ReviewForm onSuccess={handleSuccess} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewDialog;