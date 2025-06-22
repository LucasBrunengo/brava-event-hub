import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Event, Expense, Comment, Notification, Message } from '@/types';
import { mockUsers, mockEvents, mockExpenses, mockComments, mockCurrentUser, mockNotifications, mockMessages } from '@/data/mockData';

interface AppContextType {
  // Authentication
  isAuthenticated: boolean;
  currentUser: User | null;
  events: Event[];
  publicEvents: Event[];
  expenses: Expense[];
  comments: Comment[];
  notifications: Notification[];
  messages: Message[];
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  markNotificationAsRead: (notificationId: string) => void;
  sendMessage: (receiverId: string, content: string, type?: 'text' | 'event_invite' | 'payment_request', eventId?: string, amount?: number, paymentMethods?: string[]) => void;
  markMessageAsRead: (messageId: string) => void;

  // Events
  createEvent: (eventData: Partial<Event>) => void;
  updateEventRSVP: (eventId: string, status: 'going' | 'maybe' | 'not-going') => void;

  // Expenses
  addExpense: (expenseData: { eventId: string; name: string; amount: number; splitBetween: string[] }) => void;
  updatePaymentStatus: (paymentId: string, status: 'paid' | 'pending' | 'overdue') => void;

  // Comments
  addComment: (eventId: string, message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [publicEvents] = useState<Event[]>(mockEvents.filter(event => event.isPublic));
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [users, setUsers] = useState<User[]>(mockUsers);

  console.log('AppProvider rendered - isAuthenticated:', isAuthenticated, 'currentUser:', currentUser);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('Logging in with:', email, password);
    setIsAuthenticated(true);
    setCurrentUser(mockCurrentUser);
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    console.log('Registering with:', name, email, password);
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const createEvent = (eventData: Partial<Event>) => {
    if (!currentUser) return;
    
    const newEvent: Event = {
      id: `event-${Date.now()}`,
      name: eventData.name || '',
      description: eventData.description || '',
      date: eventData.date || new Date().toISOString().split('T')[0],
      time: eventData.time || '7:00 PM',
      location: eventData.location || '',
      organizerId: currentUser.id,
      organizer: currentUser,
      attendees: [{ userId: currentUser.id, user: currentUser, status: 'going', joinedAt: new Date().toISOString() }],
      createdAt: new Date().toISOString(),
      hasExpenseSplitting: eventData.hasExpenseSplitting || false,
      isPublic: eventData.isPublic || false,
      isPromoted: eventData.isPromoted || false,
      ticketPrice: eventData.ticketPrice,
      discountPercentage: eventData.discountPercentage,
      photos: eventData.photos || [],
    };

    setEvents(prev => [...prev, newEvent]);
  };

  const updateEventRSVP = (eventId: string, status: 'going' | 'maybe' | 'not-going') => {
    if (!currentUser) {
      // For the demo, if no user is logged in, we'll log them in automatically
      const user = mockCurrentUser;
      setCurrentUser(user);
      
      setEvents(prev => 
        prev.map(event => {
          if (event.id === eventId) {
            const existingAttendee = event.attendees.find(a => a.userId === user.id);
            if (existingAttendee) {
              return {
                ...event,
                attendees: event.attendees.map(a => 
                  a.userId === user.id 
                    ? { ...a, status }
                    : a
                )
              };
            } else {
              return {
                ...event,
                attendees: [...event.attendees, { userId: user.id, user: user, status, joinedAt: new Date().toISOString() }]
              };
            }
          }
          return event;
        })
      );
      return;
    };

    setEvents(prev => 
      prev.map(event => {
        if (event.id === eventId) {
          const existingAttendee = event.attendees.find(a => a.userId === currentUser.id);
          if (existingAttendee) {
            return {
              ...event,
              attendees: event.attendees.map(a => 
                a.userId === currentUser.id 
                  ? { ...a, status }
                  : a
              )
            };
          } else {
            return {
              ...event,
              attendees: [...event.attendees, { userId: currentUser.id, user: currentUser, status, joinedAt: new Date().toISOString() }]
            };
          }
        }
        return event;
      })
    );
  };

  const addExpense = (expenseData: { eventId: string; name: string; amount: number; splitBetween: string[] }) => {
    if (!currentUser) return;

    const newExpense: Expense = {
      id: `expense-${Date.now()}`,
      eventId: expenseData.eventId,
      name: expenseData.name,
      amount: expenseData.amount,
      paidBy: currentUser.id,
      splitBetween: expenseData.splitBetween,
      payments: expenseData.splitBetween
        .filter(userId => userId !== currentUser.id)
        .map(userId => ({
          id: `payment-${Date.now()}-${userId}`,
          expenseId: `expense-${Date.now()}`,
          userId,
          amount: expenseData.amount / expenseData.splitBetween.length,
          status: 'pending' as const
        })),
      createdAt: new Date().toISOString(),
    };

    setExpenses(prev => [...prev, newExpense]);
  };

  const updatePaymentStatus = (paymentId: string, status: 'paid' | 'pending' | 'overdue') => {
    setExpenses(prev => 
      prev.map(expense => ({
        ...expense,
        payments: expense.payments.map(payment => 
          payment.id === paymentId 
            ? { ...payment, status: status === 'paid' ? 'paid' : status }
            : payment
        )
      }))
    );
  };

  const addComment = (eventId: string, message: string) => {
    if (!currentUser) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      eventId,
      userId: currentUser.id,
      user: currentUser,
      message,
      createdAt: new Date().toISOString()
    };

    setComments(prev => [...prev, newComment]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const sendMessage = (receiverId: string, content: string, type: 'text' | 'event_invite' | 'payment_request' = 'text', eventId?: string, amount?: number, paymentMethods?: string[]) => {
    if (!currentUser) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      sender: currentUser,
      type,
      content,
      eventId,
      amount,
      paymentMethods,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const markMessageAsRead = (messageId: string) => {
    setMessages(prev => 
      prev.map(message => 
        message.id === messageId 
          ? { ...message, isRead: true }
          : message
      )
    );
  };

  const value: AppContextType = {
    isAuthenticated,
    currentUser,
    events,
    publicEvents,
    expenses,
    comments,
    notifications,
    messages,
    users,
    login,
    register,
    logout,
    markNotificationAsRead,
    sendMessage,
    markMessageAsRead,
    createEvent,
    updateEventRSVP,
    addExpense,
    updatePaymentStatus,
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
