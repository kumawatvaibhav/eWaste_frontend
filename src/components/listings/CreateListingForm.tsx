
import React, { useState } from 'react';
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
import { Upload } from 'lucide-react';

const listingFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  condition: z.string().min(1, 'Condition is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  location: z.string().min(1, 'Location is required'),
  contactInfo: z.string().min(1, 'Contact information is required'),
});

type ListingFormValues = z.infer<typeof listingFormSchema>;

interface CreateListingFormProps {
  onSuccess?: () => void;
}

const CreateListingForm: React.FC<CreateListingFormProps> = ({ 
  onSuccess 
}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  
  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      condition: '',
      quantity: '1',
      location: '',
      contactInfo: user?.email || '',
    },
  });

  // In a real app, this would upload to a server or cloud storage
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingImages(true);
    const filesArray = Array.from(e.target.files);
    
    // Simulate upload delay
    setTimeout(() => {
      // In a real app, this would be the URLs returned from the server
      // For demo purposes, we'll create object URLs
      const urls = filesArray.map(file => URL.createObjectURL(file));
      setImageUrls(prev => [...prev, ...urls]);
      setUploadingImages(false);
      toast.success(`${filesArray.length} image(s) uploaded successfully`);
    }, 1500);
  };

  const onSubmit = async (data: ListingFormValues) => {
    try {
      if (!user) {
        toast.error('You must be logged in to create a listing');
        return;
      }
      
      const listingData = {
        ...data,
        userId: user.id,
        quantity: parseInt(data.quantity),
        status: 'available',
        images: imageUrls,
        createdAt: new Date().toISOString(),
      };
      
      await wasteService.createListing(listingData);
      
      // Reset form
      form.reset();
      setImageUrls([]);
      
      // Invalidate listings query to refetch
      queryClient.invalidateQueries({ queryKey: ['listings'] });
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to create listing:', error);
      toast.error('Failed to create listing. Please try again.');
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
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter listing title" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the e-waste item(s)"
                  className="resize-none" 
                  rows={4}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Computers">Computers</SelectItem>
                    <SelectItem value="Smartphones">Smartphones</SelectItem>
                    <SelectItem value="Tablets">Tablets</SelectItem>
                    <SelectItem value="Appliances">Appliances</SelectItem>
                    <SelectItem value="Components">Components</SelectItem>
                    <SelectItem value="Peripherals">Peripherals</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Condition</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Like New">Like New</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                    <SelectItem value="For Parts">For Parts</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" min="1" placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
        </div>
        
        <FormField
          control={form.control}
          name="contactInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Information</FormLabel>
              <FormControl>
                <Input placeholder="Email or phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <FormLabel>Images (Optional)</FormLabel>
          <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
            <Input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Click to upload images (max 5)
                </span>
              </div>
            </label>
          </div>
          
          {uploadingImages && (
            <div className="text-sm text-center text-muted-foreground">
              Uploading images...
            </div>
          )}
          
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {imageUrls.map((url, index) => (
                <div 
                  key={index} 
                  className="relative h-16 bg-gray-100 rounded overflow-hidden"
                >
                  <img 
                    src={url} 
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Create Listing</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateListingForm;
