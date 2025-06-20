
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Event, Expense, Comment } from '@/types';
import { mockCurrentUser, mockEvents, mockExpenses, mockComments } from '@/data/mockData';

interface AppContextType {
  currentUser: User | null;
  events: Event[];
  expenses: Expense[];
  comments: Comment[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  createEvent: (event: Partial<Event>) => void;
  updateEventRSVP: (eventId: string, status: 'going' | 'maybe' | 'not-going') => void;
  addComment: (eventId: string, message: string) => void;
  addExpense: (expense: Partial<Expense>) => void;
  updatePaymentStatus: (paymentId: string, status: 'paid' | 'pending' | 'overdue') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load data from localStorage or use mock data
    const savedUser = localStorage.getItem('bravaCurrentUser');
    const savedEvents = localStorage.getItem('bravaEvents');
    const savedExpenses = localStorage.getItem('bravaExpenses');
    const savedComments = localStorage.getItem('bravaComments');

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    setEvents(savedEvents ? JSON.parse(savedEvents) : mockEvents);
    setExpenses(savedExpenses ? JSON.parse(savedExpenses) : mockExpenses);
    setComments(savedComments ? JSON.parse(savedComments) : mockComments);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    if (email && password) {
      setCurrentUser(mockCurrentUser);
      setIsAuthenticated(true);
      localStorage.setItem('bravaCurrentUser', JSON.stringify(mockCurrentUser));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock registration
    if (name && email && password) {
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
      };
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('bravaCurrentUser', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('bravaCurrentUser');
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
      expenses: [],
      photos: [],
    };

    const updatedEvents = [newEvent, ...events];
    setEvents(updatedEvents);
    localStorage.setItem('bravaEvents', JSON.stringify(updatedEvents));
  };

  const updateEventRSVP = (eventId: string, status: 'going' | 'maybe' | 'not-going') => {
    if (!currentUser) return;

    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
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
      }
      return event;
    });

    setEvents(updatedEvents);
    localStorage.setItem('bravaEvents', JSON.stringify(updatedEvents));
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

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('bravaComments', JSON.stringify(updatedComments));
  };

  const addExpense = (expenseData: Partial<Expense>) => {
    if (!currentUser) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      eventId: expenseData.eventId || '',
      name: expenseData.name || '',
      amount: expenseData.amount || 0,
      paidBy: currentUser.id,
      splitBetween: expenseData.splitBetween || [],
      createdAt: new Date().toISOString(),
      payments: expenseData.splitBetween?.map(userId => ({
        id: `${Date.now()}-${userId}`,
        expenseId: Date.now().toString(),
        userId,
        amount: (expenseData.amount || 0) / (expenseData.splitBetween?.length || 1),
        status: userId === currentUser.id ? 'paid' : 'pending',
        ...(userId === currentUser.id && { paidAt: new Date().toISOString() }),
      })) || [],
    };

    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    localStorage.setItem('bravaExpenses', JSON.stringify(updatedExpenses));
  };

  const updatePaymentStatus = (paymentId: string, status: 'paid' | 'pending' | 'overdue') => {
    const updatedExpenses = expenses.map(expense => ({
      ...expense,
      payments: expense.payments.map(payment =>
        payment.id === paymentId
          ? {
              ...payment,
              status,
              ...(status === 'paid' && { paidAt: new Date().toISOString() }),
            }
          : payment
      ),
    }));

    setExpenses(updatedExpenses);
    localStorage.setItem('bravaExpenses', JSON.stringify(updatedExpenses));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        events,
        expenses,
        comments,
        isAuthenticated,
        login,
        register,
        logout,
        createEvent,
        updateEventRSVP,
        addComment,
        addExpense,
        updatePaymentStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
