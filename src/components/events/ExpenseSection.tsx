import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Event } from '@/types';
import { useApp } from '@/context/AppContext';
import { Plus } from 'lucide-react';

interface ExpenseSectionProps {
  event: Event;
}

export const ExpenseSection: React.FC<ExpenseSectionProps> = ({ event }) => {
  const { expenses, currentUser, addExpense, updatePaymentStatus } = useApp();
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    splitBetween: [] as string[],
  });

  const eventExpenses = expenses.filter(e => e.eventId === event.id);
  const goingAttendees = event.attendees.filter(a => a.status === 'going');

  const handleAddExpense = async () => {
    if (!newExpense.name || !newExpense.amount || newExpense.splitBetween.length === 0) {
      return;
    }

    addExpense({
      eventId: event.id,
      name: newExpense.name,
      amount: parseFloat(newExpense.amount),
      splitBetween: newExpense.splitBetween,
    });

    setNewExpense({ name: '', amount: '', splitBetween: [] });
    setIsAddingExpense(false);
  };

  const handleSplitToggle = (userId: string, checked: boolean) => {
    if (checked) {
      setNewExpense(prev => ({
        ...prev,
        splitBetween: [...prev.splitBetween, userId],
      }));
    } else {
      setNewExpense(prev => ({
        ...prev,
        splitBetween: prev.splitBetween.filter(id => id !== userId),
      }));
    }
  };

  const getTotalOwed = (userId: string) => {
    return eventExpenses.reduce((total, expense) => {
      const payment = expense.payments.find(p => p.userId === userId);
      return total + (payment?.status === 'pending' ? payment.amount : 0);
    }, 0);
  };

  const getTotalPaid = (userId: string) => {
    return eventExpenses.reduce((total, expense) => {
      const payment = expense.payments.find(p => p.userId === userId);
      return total + (payment?.status === 'paid' ? payment.amount : 0);
    }, 0);
  };

  return (
    <div className="space-y-4">
      {/* Summary */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Expense Summary</CardTitle>
            <Dialog open={isAddingExpense} onOpenChange={setIsAddingExpense}>
              <DialogTrigger asChild>
                <Button size="sm" className="brava-gradient">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Expense</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="expense-name">Expense Name</Label>
                    <Input
                      id="expense-name"
                      placeholder="Groceries, Gas, etc."
                      value={newExpense.name}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expense-amount">Total Amount (€)</Label>
                    <Input
                      id="expense-amount"
                      type="number"
                      step="0.01"
                      placeholder="100.00"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>Split Between ({newExpense.splitBetween.length} people)</Label>
                    {newExpense.amount && newExpense.splitBetween.length > 0 && (
                      <p className="text-sm text-muted-foreground mb-2">
                        €{(parseFloat(newExpense.amount) / newExpense.splitBetween.length).toFixed(2)} per person
                      </p>
                    )}
                    <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                      {goingAttendees.map((attendee) => (
                        <div key={attendee.userId} className="flex items-center space-x-2">
                          <Checkbox
                            id={attendee.userId}
                            checked={newExpense.splitBetween.includes(attendee.userId)}
                            onCheckedChange={(checked) => handleSplitToggle(attendee.userId, checked as boolean)}
                          />
                          <Label htmlFor={attendee.userId} className="flex items-center gap-2 flex-1">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={attendee.user.avatar} />
                              <AvatarFallback className="text-xs">
                                {attendee.user.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            {attendee.user.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button 
                    onClick={handleAddExpense} 
                    className="w-full brava-gradient"
                    disabled={!newExpense.name || !newExpense.amount || newExpense.splitBetween.length === 0}
                  >
                    Add Expense
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">
                €{getTotalPaid(currentUser?.id || '').toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">You've Paid</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                €{getTotalOwed(currentUser?.id || '').toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">You Owe</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses List */}
      {eventExpenses.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              💰
            </div>
            <h3 className="font-semibold mb-2">No Expenses Yet</h3>
            <p className="text-muted-foreground text-sm">
              Add expenses to split costs with attendees
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {eventExpenses.map((expense) => (
            <Card key={expense.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{expense.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Paid by {goingAttendees.find(a => a.userId === expense.paidBy)?.user.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">€{expense.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      €{(expense.amount / expense.splitBetween.length).toFixed(2)} each ({expense.splitBetween.length} people)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {expense.payments.map((payment) => {
                    const user = goingAttendees.find(a => a.userId === payment.userId)?.user;
                    if (!user) return null;

                    return (
                      <div key={payment.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-xs">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>€{payment.amount.toFixed(2)}</span>
                          <Badge
                            className={
                              payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                              payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }
                          >
                            {payment.status === 'paid' ? 'Paid' :
                             payment.status === 'pending' ? 'Pending' : 'Overdue'}
                          </Badge>
                          {payment.userId === currentUser?.id && payment.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => updatePaymentStatus(payment.id, 'paid')}
                              className="text-xs h-6 px-2 brava-gradient"
                            >
                              Mark Paid
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Pay</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="h-12 flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mb-1">
                <path d="M8.34,21.92,6.42,12.83a2,2,0,0,1,1.92-2.58H15.66a2,2,0,0,1,1.92,2.58l-1.92,9.09a1.5,1.5,0,0,1-1.42,1.08H9.76A1.5,1.5,0,0,1,8.34,21.92Z"></path>
                <path d="M15.42,10.25a2,2,0,0,0-2-1.75,2.46,2.46,0,0,0-2.5,2.25,2.46,2.46,0,0,0,2.5,2.25,2,2,0,0,0,2-1.75" style={{fill: "black"}}></path>
                <path d="M12,4.5A2.5,2.5,0,0,0,9.5,2,4,4,0,0,0,8.5,4.5"></path>
              </svg>
              <div className="text-xs">Apple Pay</div>
            </Button>
            <Button variant="outline" className="h-12 flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mb-1">
                <path d="M8.34,21.92,6.42,12.83a2,2,0,0,1,1.92-2.58H15.66a2,2,0,0,1,1.92,2.58l-1.92,9.09a1.5,1.5,0,0,1-1.42,1.08H9.76A1.5,1.5,0,0,1,8.34,21.92Z"></path>
                <path d="M15.42,10.25a2,2,0,0,0-2-1.75,2.46,2.46,0,0,0-2.5,2.25,2.46,2.46,0,0,0,2.5,2.25,2,2,0,0,0,2-1.75"></path>
                <path d="M12,4.5A2.5,2.5,0,0,0,9.5,2,4,4,0,0,0,8.5,4.5"></path>
              </svg>
              <div className="text-xs">PayPal</div>
            </Button>
            <Button variant="outline" className="h-12 flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mb-1">
                <path d="M8.34,21.92,6.42,12.83a2,2,0,0,1,1.92-2.58H15.66a2,2,0,0,1,1.92,2.58l-1.92,9.09a1.5,1.5,0,0,1-1.42,1.08H9.76A1.5,1.5,0,0,1,8.34,21.92Z"></path>
                <path d="M15.42,10.25a2,2,0,0,0-2-1.75,2.46,2.46,0,0,0-2.5,2.25,2.46,2.46,0,0,0,2.5,2.25,2,2,0,0,0,2-1.75"></path>
                <path d="M12,4.5A2.5,2.5,0,0,0,9.5,2,4,4,0,0,0,8.5,4.5"></path>
              </svg>
              <div className="text-xs">Google Pay</div>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Demo mode - payments are simulated
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
