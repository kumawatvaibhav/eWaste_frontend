
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { toast } from 'sonner';
import { authService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6, { message: "Current password is required" }),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const PasswordForm: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordFormValues) => {
    if (!user) {
      toast.error('You must be logged in to change your password');
      return;
    }

    setIsLoading(true);
    
    try {
      await authService.changePassword(user.id, data.currentPassword, data.newPassword);
      form.reset();
      toast.success('Password updated successfully');
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error('Failed to change password. Please check your current password and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter current password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={() => form.reset()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </Form>
        
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-medium mb-2">Forgot Password?</h3>
          <p className="text-muted-foreground mb-4">
            If you can't remember your current password, you can request a password reset.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              if (user?.email) {
                authService.resetPassword(user.email)
                  .then(() => {
                    toast.success('Password reset instructions sent to your email');
                  })
                  .catch((err) => {
                    console.error('Password reset error:', err);
                    toast.error('Failed to send password reset email');
                  });
              } else {
                toast.error('No email address associated with your account');
              }
            }}
          >
            Reset Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordForm;
