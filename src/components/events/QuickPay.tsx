import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const QuickPay: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Pay</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center p-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mb-1">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                <path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
            </div>
            <div className="text-xs">Apple Pay</div>
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center p-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mb-1">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                <path fill="currentColor" d="M20.067 8.478c.492.315.844.825.844 1.522 0 .697-.352 1.207-.844 1.522-.492.315-1.139.473-1.844.473-.705 0-1.352-.158-1.844-.473-.492-.315-.844-.825-.844-1.522 0-.697.352-1.207.844-1.522.492-.315 1.139-.473 1.844-.473.705 0 1.352.158 1.844.473zM12.067 8.478c.492.315.844.825.844 1.522 0 .697-.352 1.207-.844 1.522-.492.315-1.139.473-1.844.473-.705 0-1.352-.158-1.844-.473-.492-.315-.844-.825-.844-1.522 0-.697.352-1.207.844-1.522.492-.315 1.139-.473 1.844-.473.705 0 1.352.158 1.844.473z"/>
              </svg>
            </div>
            <div className="text-xs">PayPal</div>
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center p-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-1">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div className="text-xs">Google Pay</div>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Demo mode - payments are simulated
        </p>
      </CardContent>
    </Card>
  );
}; 