
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

// Types
interface AuthFormProps {
  type: 'login' | 'register';
}

// Form schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create form with schema validation
  const isLogin = type === 'login';
  const schema = isLogin ? loginSchema : registerSchema;

  const form = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: isLogin
      ? { email: '', password: '' }
      : { name: '', email: '', password: '' },
  });

  // Form submission handler
  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (isLogin) {
        const { email, password } = data as LoginFormData;
        await login(email, password);
      } else {
        const { name, email, password } = data as RegisterFormData;
        await register(name, email, password);
      }
    } catch (err) {
      // Error is already displayed via toast through API interceptors
      setError('Authentication failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden">
      <div className="p-8 space-y-6">
        {/* Form Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="text-muted-foreground">
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Join us to start tracking your e-waste impact'}
          </p>
        </div>

        {/* Authentication Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field (Register only) */}
            {!isLogin && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter your name"
                          className="pl-10"
                          {...field}
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        className="pl-10"
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={isLogin ? "Enter your password" : "Create a password"}
                        type={showPassword ? 'text' : 'password'}
                        className="pl-10 pr-10"
                        {...field}
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error Message */}
            {error && (
              <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md" role="alert">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-ewaste-500 hover:bg-ewaste-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>{isLogin ? 'Sign In' : 'Create Account'}</>
              )}
            </Button>
          </form>
        </Form>

        {/* Form Footer - Alternate Action */}
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link
              to={isLogin ? '/register' : '/login'}
              className="font-medium text-ewaste-600 hover:text-ewaste-700 transition-colors"
            >
              {isLogin ? 'Create one now' : 'Sign in here'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
