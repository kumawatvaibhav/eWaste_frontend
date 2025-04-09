
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
import CreateTransactionForm from './CreateTransactionForm';

interface TransactionDialogProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const TransactionDialog: React.FC<TransactionDialogProps> = ({ 
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
      {/* <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            <span>Record Transaction</span>
          </Button>
        )}
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Record E-Waste Transaction</DialogTitle>
          <DialogDescription>
            Document your e-waste disposal or recycling activity
          </DialogDescription>
        </DialogHeader>
        <CreateTransactionForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;