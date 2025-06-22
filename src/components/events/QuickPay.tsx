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
            <img src="https://developer.apple.com/design/human-interface-guidelines/technologies/apple-pay/images/apple-pay-mark_2x.png" alt="Apple Pay" className="h-8 object-contain mb-1"/>
            <div className="text-xs">Apple Pay</div>
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center p-2">
            <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" alt="PayPal" className="h-8 object-contain mb-1"/>
            <div className="text-xs">PayPal</div>
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center p-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-8 object-contain mb-1"/>
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