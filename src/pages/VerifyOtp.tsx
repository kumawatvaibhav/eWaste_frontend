
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Mail, Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';

const VerifyOtp: React.FC = () => {
  const { pendingVerification, currentEmail, verifyOtp, isLoading } = useAuth();
  const [otp, setOtp] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(60);
  const navigate = useNavigate();

  // Redirect if not in verification flow
  useEffect(() => {
    if (!pendingVerification) {
      navigate('/register');
    }
  }, [pendingVerification, navigate]);

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setSecondsLeft(seconds => seconds - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return;
    
    try {
      await verifyOtp(otp);
      // Redirect happens in verifyOtp function if successful
    } catch (error) {
      console.error('Verification error:', error);
      // Error is already displayed via toast
    }
  };

  // Function to display a masked email
  const getMaskedEmail = (email: string) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    if (!username || !domain) return email;
    
    const maskedUsername = username.slice(0, 2) + '●'.repeat(Math.min(username.length - 3, 5)) + username.slice(-1);
    return `${maskedUsername}@${domain}`;
  };

  const handleResendOtp = () => {
    // In a real app, this would call the API to resend OTP
    // For now, we just reset the timer
    setSecondsLeft(60);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel - Visual/Background */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-400 to-indigo-600 p-12 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full transform -translate-x-1/3 translate-y-1/3" />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Verify Your Account</h2>
          <p className="text-xl mb-8 text-white/80 max-w-md">
            We're committed to keeping your account secure. Please verify your identity to continue.
          </p>
          
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Strong Security</h3>
                <p className="text-white/70">
                  Our verification process ensures your account remains protected from unauthorized access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Panel - Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center mb-10 justify-center md:justify-start">
            <Leaf className="w-8 h-8 text-ewaste-500" />
            <span className="ml-2 font-bold text-xl">
              <span className="text-ewaste-700">e</span>Waste
            </span>
          </div>
          
          {/* OTP Verification Form */}
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">Verification Required</h1>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>Code sent to {getMaskedEmail(currentEmail)}</span>
              </div>
            </div>
            
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter the 6-digit OTP</Label>
                <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={isLoading}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-ewaste-500 hover:bg-ewaste-600 text-white"
                disabled={otp.length < 6 || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Account'
                )}
              </Button>
              
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Didn't receive the code?{' '}
                  {secondsLeft > 0 ? (
                    <span>Resend in {secondsLeft}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="font-medium text-ewaste-600 hover:text-ewaste-700 transition-colors"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
