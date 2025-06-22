import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Event, User } from '@/types';
import { useApp } from '@/context/AppContext';
import { Plus } from 'lucide-react';
import { DialogOverlay, DialogPortal } from '@radix-ui/react-dialog';

interface ExpenseSectionProps {
  event: Event;
  portalContainer?: HTMLElement | null;
}

export const ExpenseSection: React.FC<ExpenseSectionProps> = ({ event, portalContainer }) => {
  const { expenses, currentUser, addExpense, updatePaymentStatus, setViewedProfile } = useApp();
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    name: '',
    amount: '',
    splitBetween: [] as string[],
  });

  const eventExpenses = expenses.filter(e => e.eventId === event.id);
  const goingAttendees = event.attendees.filter(a => a.status === 'going');

  const handleUserClick = (user: User) => {
    setViewedProfile(user);
  };
  
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

  const { totalOwed, totalPaid, netBalance } = React.useMemo(() => {
    if (!currentUser) {
      return { totalOwed: 0, totalPaid: 0, netBalance: 0 };
    }

    let owed = 0;
    let paid = 0;

    eventExpenses.forEach(expense => {
      // Amount user owes to others
      const paymentAsDebtor = expense.payments.find(p => p.userId === currentUser.id && p.status === 'pending');
      if (paymentAsDebtor) {
        owed += paymentAsDebtor.amount;
      }
      
      // Amount others owe to the user
      if (expense.paidBy === currentUser.id) {
        expense.payments.forEach(payment => {
          if (payment.status === 'pending') {
            paid += payment.amount;
          }
        });
      }
    });

    return { totalOwed: owed, totalPaid: paid, netBalance: paid - owed };
  }, [eventExpenses, currentUser]);
  
  const PayerProfile: React.FC<{ userId: string }> = ({ userId }) => {
    const user = goingAttendees.find(a => a.userId === userId)?.user;
    if (!user) return <span>A member</span>;
    return (
      <button onClick={() => handleUserClick(user)} className="font-medium text-primary hover:underline">
        {user.id === currentUser?.id ? 'you' : user.name}
      </button>
    );
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
              <DialogPortal container={portalContainer}>
                <DialogOverlay className="absolute inset-0 bg-black/30" />
                <DialogContent className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
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
              </DialogPortal>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {netBalance >= 0 ? (
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                €{netBalance.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">You are owed in total</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                €{Math.abs(netBalance).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">You owe in total</p>
            </div>
          )}
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
                      Paid by <PayerProfile userId={expense.paidBy} />
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
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleUserClick(user)}>
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
    </div>
  );
};
