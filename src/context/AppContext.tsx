import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Event, Expense, Comment } from '@/types';
import { mockCurrentUser, mockEvents, mockExpenses, mockComments, mockPublicEvents } from '@/data/mockData';

interface AppContextType {
  // Authentication
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;

  // Events
  events: Event[];
  publicEvents: Event[];
  createEvent: (eventData: Partial<Event>) => void;
  updateEventRSVP: (eventId: string, status: 'going' | 'maybe' | 'not-going') => void;

  // Expenses
  expenses: Expense[];
  addExpense: (expenseData: { eventId: string; name: string; amount: number; splitBetween: string[] }) => void;
  updatePaymentStatus: (paymentId: string, status: 'paid' | 'pending' | 'overdue') => void;

  // Comments
  comments: Comment[];
  addComment: (eventId: string, message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(mockCurrentUser);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [publicEvents] = useState<Event[]>(mockPublicEvents);
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [comments, setComments] = useState<Comment[]>(mockComments);

  const login = async (email: string, password: string) => {
    console.log('Logging in with:', email, password);
    setIsAuthenticated(true);
    setCurrentUser(mockCurrentUser);
  };

  const signup = async (name: string, email: string, password: string) => {
    console.log('Signing up with:', name, email, password);
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const createEvent = (eventData: Partial<Event>) => {
    if (!currentUser) return;

    const newEvent: Event = {
      id: Date.now().toString(),
      name: eventData.name || '',
      description: eventData.description || '',
      date: eventData.date || '',
      time: eventData.time || '',
      location: eventData.location || '',
      organizerId: currentUser.id,
      organizer: currentUser,
      hasExpenseSplitting: eventData.hasExpenseSplitting || false,
      createdAt: new Date().toISOString(),
      attendees: [
        {
          userId: currentUser.id,
          user: currentUser,
          status: 'going',
          joinedAt: new Date().toISOString(),
        },
      ],
    };

    setEvents(prev => [newEvent, ...prev]);
  };

  const updateEventRSVP = (eventId: string, status: 'going' | 'maybe' | 'not-going') => {
    if (!currentUser) return;

    setEvents(prev => prev.map(event => {
      if (event.id !== eventId) return event;

      const existingAttendee = event.attendees.find(a => a.userId === currentUser.id);
      
      if (existingAttendee) {
        return {
          ...event,
          attendees: event.attendees.map(a =>
            a.userId === currentUser.id ? { ...a, status } : a
          ),
        };
      } else {
        return {
          ...event,
          attendees: [
            ...event.attendees,
            {
              userId: currentUser.id,
              user: currentUser,
              status,
              joinedAt: new Date().toISOString(),
            },
          ],
        };
      }
    }));
  };

  const addExpense = (expenseData: { eventId: string; name: string; amount: number; splitBetween: string[] }) => {
    if (!currentUser) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      eventId: expenseData.eventId,
      name: expenseData.name,
      amount: expenseData.amount,
      paidBy: currentUser.id,
      splitBetween: expenseData.splitBetween,
      createdAt: new Date().toISOString(),
      payments: expenseData.splitBetween.map(userId => ({
        id: `${Date.now()}-${userId}`,
        expenseId: Date.now().toString(),
        userId,
        amount: expenseData.amount / expenseData.splitBetween.length,
        status: userId === currentUser.id ? 'paid' : 'pending' as const,
        paidAt: userId === currentUser.id ? new Date().toISOString() : undefined,
      })),
    };

    setExpenses(prev => [...prev, newExpense]);
  };

  const updatePaymentStatus = (paymentId: string, status: 'paid' | 'pending' | 'overdue') => {
    setExpenses(prev => prev.map(expense => ({
      ...expense,
      payments: expense.payments.map(payment =>
        payment.id === paymentId
          ? { ...payment, status, paidAt: status === 'paid' ? new Date().toISOString() : undefined }
          : payment
      ),
    })));
  };

  const addComment = (eventId: string, message: string) => {
    if (!currentUser) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      eventId,
      userId: currentUser.id,
      user: currentUser,
      message,
      createdAt: new Date().toISOString(),
    };

    setComments(prev => [...prev, newComment]);
  };

  const value: AppContextType = {
    isAuthenticated,
    currentUser,
    login,
    signup,
    logout,
    events,
    publicEvents,
    createEvent,
    updateEventRSVP,
    expenses,
    addExpense,
    updatePaymentStatus,
    comments,
    addComment,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
