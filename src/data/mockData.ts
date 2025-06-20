
import { User, Event, Expense, Payment, Comment } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Mike Torres',
    email: 'mike@example.com'
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com'
  },
  {
    id: '5',
    name: 'James Park',
    email: 'james@example.com'
  }
];

export const mockCurrentUser: User = mockUsers[0];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Beach House Weekend',
    description: 'Annual summer getaway with the gang! Bring sunscreen and good vibes.',
    date: '2024-07-15',
    time: '10:00',
    location: 'Malibu Beach House, CA',
    organizerId: '1',
    organizer: mockUsers[0],
    hasExpenseSplitting: true,
    createdAt: '2024-06-01T10:00:00Z',
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-06-01T10:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-06-01T11:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'maybe', joinedAt: '2024-06-01T12:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-06-01T13:00:00Z' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'
    ]
  },
  {
    id: '2',
    name: 'Birthday Dinner',
    description: "Celebrating Sarah's 25th at her favorite Italian place!",
    date: '2024-06-25',
    time: '19:00',
    location: 'Nonna Maria Restaurant, Downtown',
    organizerId: '2',
    organizer: mockUsers[1],
    hasExpenseSplitting: true,
    createdAt: '2024-06-10T15:00:00Z',
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-06-10T16:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-06-10T15:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-06-10T17:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'not-going', joinedAt: '2024-06-10T18:00:00Z' }
    ]
  },
  {
    id: '3',
    name: 'Movie Night',
    description: 'Marvel marathon at my place. BYOB!',
    date: '2024-06-20',
    time: '18:00',
    location: "Alex's Apartment",
    organizerId: '1',
    organizer: mockUsers[0],
    hasExpenseSplitting: false,
    createdAt: '2024-06-15T20:00:00Z',
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-06-15T20:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-06-15T21:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-06-15T22:00:00Z' }
    ]
  }
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    eventId: '1',
    name: 'House Rental',
    amount: 800,
    paidBy: '1',
    splitBetween: ['1', '2', '3', '4'],
    createdAt: '2024-06-01T10:00:00Z',
    payments: [
      { id: '1', expenseId: '1', userId: '1', amount: 200, status: 'paid', paidAt: '2024-06-01T10:00:00Z' },
      { id: '2', expenseId: '1', userId: '2', amount: 200, status: 'paid', paidAt: '2024-06-02T14:00:00Z' },
      { id: '3', expenseId: '1', userId: '3', amount: 200, status: 'pending' },
      { id: '4', expenseId: '1', userId: '4', amount: 200, status: 'paid', paidAt: '2024-06-03T09:00:00Z' }
    ]
  },
  {
    id: '2',
    eventId: '1',
    name: 'Groceries & Supplies',
    amount: 240,
    paidBy: '2',
    splitBetween: ['1', '2', '3', '4'],
    createdAt: '2024-06-05T16:00:00Z',
    payments: [
      { id: '5', expenseId: '2', userId: '1', amount: 60, status: 'pending' },
      { id: '6', expenseId: '2', userId: '2', amount: 60, status: 'paid', paidAt: '2024-06-05T16:00:00Z' },
      { id: '7', expenseId: '2', userId: '3', amount: 60, status: 'pending' },
      { id: '8', expenseId: '2', userId: '4', amount: 60, status: 'paid', paidAt: '2024-06-06T11:00:00Z' }
    ]
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    eventId: '1',
    userId: '2',
    user: mockUsers[1],
    message: 'So excited for this! Should we coordinate carpooling?',
    createdAt: '2024-06-02T14:30:00Z'
  },
  {
    id: '2',
    eventId: '1',
    userId: '1',
    user: mockUsers[0],
    message: 'Great idea! I can drive 3 people max.',
    createdAt: '2024-06-02T15:00:00Z'
  },
  {
    id: '3',
    eventId: '1',
    userId: '4',
    user: mockUsers[3],
    message: 'Count me in for the carpool! 🚗',
    createdAt: '2024-06-02T16:15:00Z'
  }
];
