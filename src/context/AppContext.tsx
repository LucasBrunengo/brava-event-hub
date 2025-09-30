import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Event, Expense, Comment, Notification, Message, UserProfile as UserProfileType, MyTicket, TicketTier } from '@/types';
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
  myTickets?: MyTicket[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  markNotificationAsRead: (notificationId: string) => void;
  sendMessage: (receiverId: string, content: string, type?: 'text' | 'event_invite' | 'payment_request', eventId?: string, amount?: number, paymentMethods?: string[]) => void;
  markMessageAsRead: (messageId: string) => void;

  // Events
  createEvent: (eventData: Partial<Event>) => void;
  updateEvent: (eventId: string, eventData: Partial<Event>) => void;
  updateEventRSVP: (eventId: string, status: 'going' | 'maybe' | 'not-going') => void;
  inviteFriendsToEvent: (eventId: string, friendIds: string[], message: string) => void;
  purchaseTickets?: (eventId: string, tierId: string, quantity: number) => void;

  // Expenses
  addExpense: (expenseData: { eventId: string; name: string; amount: number; splitBetween: string[] }) => void;
  updatePaymentStatus: (paymentId: string, status: 'paid' | 'pending' | 'overdue') => void;

  // Comments
  addComment: (eventId: string, message: string) => void;
  
  // Profiles
  viewedProfile: UserProfileType | null;
  setViewedProfile: (user: User | null) => void;
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
  const [viewedProfile, setViewedProfileInternal] = useState<UserProfileType | null>(null);
  const [myTickets, setMyTickets] = useState<MyTicket[]>([]);

  console.log('AppProvider rendered - isAuthenticated:', isAuthenticated, 'currentUser:', currentUser);

  const setViewedProfile = (user: User | null) => {
    if (!user) {
      setViewedProfileInternal(null);
      return;
    }

    if (user.id === currentUser?.id) {
       // Later, this could navigate to the main profile page
       console.log("Viewing current user's profile.");
       return; 
    }
    
    // Create mock user profile data
    const sharedEvents = events.filter(e => 
      e.attendees.some(a => a.userId === currentUser?.id && a.status === 'going') &&
      e.attendees.some(a => a.userId === user.id && a.status === 'going')
    );

    const userProfile: UserProfileType = {
      user,
      mutualFriends: Math.floor(Math.random() * 15) + 1,
      sharedEvents,
      sharedPhotos: [],
      friendship: {
        id: `friendship-${user.id}`,
        userId1: currentUser?.id || '',
        userId2: user.id,
        status: 'accepted',
        createdAt: new Date().toISOString(),
        sharedEvents: sharedEvents.map(e => e.id)
      }
    };
    
    setViewedProfileInternal(userProfile);
  };

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
      category: eventData.category,
      venueId: eventData.venueId,
      totalTickets: eventData.totalTickets || 0,
      soldTickets: 0,
      ticketTiers: eventData.ticketTiers || [],
    };

    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (eventId: string, eventData: Partial<Event>) => {
    if (!currentUser) return;

    setEvents(prev => 
      prev.map(event => 
        event.id === eventId ? { ...event, ...eventData } : event
      )
    );
  };

  const updateEventRSVP = (eventId: string, status: 'going' | 'maybe' | 'not-going') => {
    const user = currentUser || mockCurrentUser;
    if (!currentUser) {
      setCurrentUser(user);
    }

    setEvents(prev => 
      prev.map(event => {
        if (event.id === eventId) {
          const existingAttendee = event.attendees.find(a => a.userId === user.id);
          if (existingAttendee) {
            // Update status
            return {
              ...event,
              attendees: event.attendees.map(a => 
                a.userId === user.id ? { ...a, status } : a
              )
            };
          } else {
            // Add new attendee
            return {
              ...event,
              attendees: [...event.attendees, { userId: user.id, user, status, joinedAt: new Date().toISOString() }]
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

  const inviteFriendsToEvent = (eventId: string, friendIds: string[], message: string) => {
    if (!currentUser) return;

    // Find the event
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    // Add friends to the event attendees
    setEvents(prev => 
      prev.map(e => {
        if (e.id === eventId) {
          const newAttendees = [...e.attendees];
          
          friendIds.forEach(friendId => {
            const friend = users.find(u => u.id === friendId);
            if (friend && !newAttendees.some(a => a.userId === friendId)) {
              newAttendees.push({
                userId: friendId,
                user: friend,
                status: 'maybe', // Default status for invited friends
                joinedAt: new Date().toISOString()
              });
            }
          });
          
          return { ...e, attendees: newAttendees };
        }
        return e;
      })
    );

    // Send notifications to invited friends
    friendIds.forEach(friendId => {
      const newNotification: Notification = {
        id: `notification-${Date.now()}-${friendId}`,
        type: 'event_invite',
        title: `You're invited to ${event.name}!`,
        message: message || `${currentUser.name} has invited you to their event.`,
        userId: friendId,
        relatedEventId: eventId,
        relatedUserId: currentUser.id,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      
      setNotifications(prev => [...prev, newNotification]);
    });
  };

  const purchaseTickets = (eventId: string, tierId: string, quantity: number) => {
    if (!currentUser || quantity <= 0) return;
    setEvents(prev => prev.map(e => {
      if (e.id !== eventId) return e;
      const tiers = e.ticketTiers || [];
      const idx = tiers.findIndex(t => t.id === tierId);
      if (idx === -1) return e;
      const tier = tiers[idx];
      const remaining = tier.quantity - tier.sold;
      const toSell = Math.min(quantity, Math.max(remaining, 0));
      const updatedTier: TicketTier = { ...tier, sold: tier.sold + toSell };
      const updatedTiers = [...tiers];
      updatedTiers[idx] = updatedTier;
      return { ...e, soldTickets: (e.soldTickets || 0) + toSell, ticketTiers: updatedTiers };
    }));

    const ticket: MyTicket = {
      id: `ticket-${Date.now()}`,
      userId: currentUser.id,
      eventId,
      tierId,
      tierName: (events.find(e => e.id === eventId)?.ticketTiers || []).find(t => t.id === tierId)?.name || 'Ticket',
      quantity,
      qrData: `${eventId}:${tierId}:${currentUser.id}:${Date.now()}`,
      purchasedAt: new Date().toISOString(),
    };
    setMyTickets(prev => [...prev, ticket]);
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
    myTickets,
    login,
    register,
    logout,
    markNotificationAsRead,
    sendMessage,
    markMessageAsRead,
    createEvent,
    updateEvent,
    updateEventRSVP,
    addExpense,
    updatePaymentStatus,
    addComment,
    inviteFriendsToEvent,
    purchaseTickets,
    viewedProfile,
    setViewedProfile,
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
