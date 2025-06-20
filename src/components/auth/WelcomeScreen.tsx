
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

export const WelcomeScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useApp();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success = false;
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await register(formData.name, formData.email, formData.password);
      }

      if (success) {
        toast({
          title: 'Welcome to Brava!',
          description: isLogin ? 'Successfully logged in.' : 'Account created successfully.',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Invalid credentials. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 brava-gradient">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <div className="text-2xl font-bold brava-text-gradient">B</div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome to Brava</h1>
            <p className="text-white/80 text-lg">Organize events without the WhatsApp chaos</p>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl">
              {isLogin ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin ? 'Welcome back!' : 'Join thousands organizing better events'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="h-11"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 brava-gradient hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </Button>
            </div>

            {/* Demo credentials */}
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                Demo: Use any email/password to continue
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
