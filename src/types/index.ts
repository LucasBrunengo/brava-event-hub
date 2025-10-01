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
  isPast?: boolean;
  category?: string;
  venueId?: string;
  totalTickets?: number;
  soldTickets?: number;
  ticketTiers?: TicketTier[];
  customBanner?: string;
  views?: number;
}

export type VenueCategory = 'restaurant' | 'wellness' | 'entertainment' | 'other';

export interface VenueAvailabilitySlot {
  date: string; // YYYY-MM-DD
  times: string[]; // e.g., ["18:00", "18:30", ...]
}

export interface Venue {
  id: string;
  name: string;
  category: VenueCategory;
  address: string;
  imageUrl?: string;
  cuisines?: string[]; // for restaurants
  tags?: string[]; // amenities like yoga, sauna, live-music
  hasReservations: boolean;
  availability?: VenueAvailabilitySlot[];
  promoted?: boolean;
  distanceKm?: number;
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

export interface TicketTier {
  id: string;
  name: string; // e.g., Early Bird, First Release
  price: number;
  quantity: number; // total allocation for the tier
  sold: number; // sold within the tier
  releaseDate?: string;
  releaseTime?: string;
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

export interface MyTicket {
  id: string;
  userId: string;
  eventId: string;
  tierId: string;
  tierName: string;
  quantity: number;
  qrData: string;
  purchasedAt: string;
}
