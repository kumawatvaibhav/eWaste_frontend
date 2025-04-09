
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { DialogClose } from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { wasteService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

const transactionFormSchema = z.object({
  wasteType: z.string().min(1, 'Waste type is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  unit: z.string().min(1, 'Unit is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().optional(),
});

type TransactionFormValues = z.infer<typeof transactionFormSchema>;

interface CreateTransactionFormProps {
  onSuccess?: () => void;
}

const CreateTransactionForm: React.FC<CreateTransactionFormProps> = ({ 
  onSuccess 
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      wasteType: '',
      quantity: '',
      unit: 'kg',
      location: '',
      description: '',
    },
  });

  const onSubmit = async (data: TransactionFormValues) => {
    try {
      if (!user) {
        toast.error('You must be logged in to record a transaction');
        return;
      }
      
      const transactionData = {
        ...data,
        userId: user.id,
        quantity: parseFloat(data.quantity),
        date: new Date().toISOString(),
        status: 'pending',
      };
      
      await wasteService.createTransaction(transactionData);
      
      // Reset form
      form.reset();
      
      // Invalidate transitions query to refetch
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to create transaction:', error);
      toast.error('Failed to record transaction. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="wasteType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waste Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Batteries">Batteries</SelectItem>
                  <SelectItem value="Appliances">Appliances</SelectItem>
                  <SelectItem value="Light Bulbs">Light Bulbs</SelectItem>
                  <SelectItem value="Components">Components</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="g">Grams (g)</SelectItem>
                    <SelectItem value="items">Items</SelectItem>
                    <SelectItem value="pieces">Pieces</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Add additional details about the e-waste transition"
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Record Transition</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateTransactionForm;
