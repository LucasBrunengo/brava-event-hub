export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  bio?: string;
  location?: string;
  joinedDate?: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizerId: string;
  organizer: User;
  attendees: EventAttendee[];
  totalAttendees?: number;
  expenses?: Expense[];
  photos?: EventPhoto[];
  createdAt: string;
  hasExpenseSplitting: boolean;
  isPublic?: boolean;
  ticketUrl?: string;
  ticketPrice?: number;
  isPromoted?: boolean;
  discountPercentage?: number;
  comments?: Comment[];
}

export interface EventPhoto {
  id: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  reactions: PhotoReaction[];
  comments: PhotoComment[];
  taggedUsers: string[];
}

export interface PhotoReaction {
  id: string;
  userId: string;
  emoji: string;
  createdAt: string;
}

export interface PhotoComment {
  id: string;
  userId: string;
  user: User;
  message: string;
  createdAt: string;
}

export interface EventAttendee {
  userId: string;
  user: User;
  status: 'going' | 'maybe' | 'not-going';
  joinedAt: string;
  ticketStatus?: 'purchased' | 'pending' | 'not-purchased';
}

export interface Expense {
  id: string;
  eventId: string;
  name: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  payments: Payment[];
  createdAt: string;
}

export interface Payment {
  id: string;
  expenseId: string;
  userId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  paidAt?: string;
}

export interface Comment {
  id: string;
  eventId: string;
  userId: string;
  user: User;
  message: string;
  createdAt: string;
}

export interface Friendship {
  id: string;
  userId1: string;
  userId2: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: string;
  sharedEvents: string[];
}

export interface UserProfile {
  user: User;
  mutualFriends: number;
  sharedEvents: Event[];
  sharedPhotos: EventPhoto[];
  friendship?: Friendship;
}

export interface Notification {
  id: string;
  type: 'event_invite' | 'event_update' | 'payment_request' | 'message' | 'reminder';
  title: string;
  message: string;
  userId: string;
  relatedEventId?: string;
  relatedUserId?: string;
  isRead: boolean;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  sender: User;
  type: 'text' | 'event_invite' | 'payment_request';
  content: string;
  eventId?: string;
  amount?: number;
  paymentMethods?: string[];
  isRead: boolean;
  createdAt: string;
}
