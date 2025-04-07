
import React from 'react';
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
import CreateListingForm from './CreateListingForm';

interface ListingDialogProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const ListingDialog: React.FC<ListingDialogProps> = ({ 
  trigger,
  onSuccess 
}) => {
  const [open, setOpen] = React.useState(false);
  
  const handleSuccess = () => {
    setOpen(false);
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
            <span>Create Listing</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] p-4 overflow-hidden">
        <DialogHeader className="pb-2">
          <DialogTitle>Create E-Waste Listing</DialogTitle>
          <DialogDescription>
            List your electronic waste items for recycling or reuse
          </DialogDescription>
        </DialogHeader>
        <CreateListingForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default ListingDialog;
