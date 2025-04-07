
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
import CreateTransitionForm from './CreateTransitionForm';

interface TransitionDialogProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const TransitionDialog: React.FC<TransitionDialogProps> = ({ 
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
            <span>Record Transition</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Record E-Waste Transition</DialogTitle>
          <DialogDescription>
            Document your e-waste disposal or recycling activity
          </DialogDescription>
        </DialogHeader>
        <CreateTransitionForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default TransitionDialog;
