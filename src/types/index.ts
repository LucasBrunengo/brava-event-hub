
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
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
  expenses?: Expense[];
  photos?: string[];
  createdAt: string;
  hasExpenseSplitting: boolean;
  isPublic?: boolean;
  ticketUrl?: string;
  ticketPrice?: number;
}

export interface EventAttendee {
  userId: string;
  user: User;
  status: 'going' | 'maybe' | 'not-going';
  joinedAt: string;
  hasPurchasedTicket?: boolean;
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
