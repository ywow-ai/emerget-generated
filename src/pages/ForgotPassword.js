import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Shirt, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) return;
    
    setIsLoading(true);
    
    // Mock password reset - simulate API call
    setTimeout(() => {
      setIsEmailSent(true);
      toast({
        title: 'Reset link sent!',
        description: 'Check your email for password reset instructions.',
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="border-[var(--border)] shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--card-gradient)' }}>
                <CheckCircle className="w-10 h-10 text-[var(--success)]" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Check Your Email</h2>
              <p className="text-[var(--text-secondary)] mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Button
                onClick={() => setIsEmailSent(false)}
                variant="outline"
                className="w-full mb-3"
              >
                Send Again
              </Button>
              <Link to="/login">
                <Button
                  className="w-full text-white"
                  style={{ background: 'var(--button-primary)' }}
                >
                  Back to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--hero-gradient)' }}>
              <Shirt className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold" style={{ background: 'var(--hero-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              CosplayHub
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Forgot Password?</h1>
          <p className="text-[var(--text-secondary)]">No worries, we'll send you reset instructions.</p>
        </div>

        {/* Form */}
        <Card className="border-[var(--border)] shadow-xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[var(--text-primary)]">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={handleChange}
                    className={`pl-10 ${error ? 'border-[var(--error)]' : ''}`}
                  />
                </div>
                {error && <p className="text-sm text-[var(--error)]">{error}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-6 text-base font-semibold text-white rounded-lg"
                style={{ background: 'var(--button-primary)' }}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>

            {/* Back to Login */}
            <Link to="/login">
              <Button
                variant="ghost"
                className="w-full mt-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;