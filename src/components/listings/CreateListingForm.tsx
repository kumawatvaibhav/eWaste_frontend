import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { DialogClose } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  quantity: z.string().min(1, 'Quantity is required'),
  units: z.string().min(1, 'Unit is required'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(1, 'Location is required'),
  latitude: z.preprocess((val) => parseFloat(val as string), z.number().min(-90, 'Invalid latitude').max(90, 'Invalid latitude')),
  longitude: z.preprocess((val) => parseFloat(val as string), z.number().min(-180, 'Invalid longitude').max(180, 'Invalid longitude')),
  listingType: z.enum(['donation', 'selling', 'exchange']),
  price: z.preprocess((val) => parseFloat(val as string), z.number().min(0, 'Price must be a positive number')),
  images: z.array(z.string()).optional(),
  contactInfo: z.string().min(1, 'Contact information is required'),
});


type ListingFormValues = z.infer<typeof listingFormSchema>;

interface CreateListingFormProps {
  onSuccess?: () => void;
}

const CreateListingForm: React.FC<CreateListingFormProps> = ({ onSuccess }) => {
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
      quantity: '1',
      units: '',
      location: '',
      contactInfo: user?.email || '',
      latitude: 0,
      longitude: 0,
      listingType: 'donation',
      price: 0,
      images: [],
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploadingImages(true);
    const filesArray = Array.from(e.target.files);

    setTimeout(() => {
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
        quantity: parseInt(data.quantity),
        price: parseFloat(String(data.price)),
        latitude: parseFloat(String(data.latitude)),
        longitude: parseFloat(String(data.longitude)),
        status: 'available',
        images: imageUrls,
        createdAt: new Date().toISOString(),
      };

      await wasteService.createListing(listingData);

      form.reset();
      setImageUrls([]);
      queryClient.invalidateQueries({ queryKey: ['listings'] });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Failed to create listing:', error);
      toast.error('Failed to create listing. Please try again.');
    }
  };

  return (
    <ScrollArea className="h-[calc(85vh-10rem)] pr-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              name="listingType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select listing type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="donation">Donation</SelectItem>
                      <SelectItem value="selling">Selling</SelectItem>
                      <SelectItem value="exchange">Exchange</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.watch('listingType') === 'selling' && (
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" placeholder="Enter price in ₹" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="units"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Units</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., pieces, kg" {...field} />
                  </FormControl>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input type="number" step="any" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input type="number" step="any" {...field} />
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
            <div className="border border-dashed border-gray-300 rounded-md p-3 text-center">
              <Input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center space-y-1">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    Click to upload images (max 5)
                  </span>
                </div>
              </label>
            </div>

            {uploadingImages && (
              <div className="text-xs text-center text-muted-foreground">
                Uploading images...
              </div>
            )}

            {imageUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative h-14 bg-gray-100 rounded overflow-hidden"
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

          <div className="flex justify-end space-x-2 pt-3 sticky bottom-0 bg-background">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Create Listing</Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default CreateListingForm;
