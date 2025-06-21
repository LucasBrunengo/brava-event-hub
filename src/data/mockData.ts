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
  },
  {
    id: '6',
    name: 'Lisa Rodriguez',
    email: 'lisa@example.com'
  },
  {
    id: '7',
    name: 'David Kim',
    email: 'david@example.com'
  },
  {
    id: '8',
    name: 'Sophie Martinez',
    email: 'sophie@example.com'
  },
  {
    id: '9',
    name: 'Ryan Thompson',
    email: 'ryan@example.com'
  },
  {
    id: '10',
    name: 'Mia Garcia',
    email: 'mia@example.com'
  },
  {
    id: '11',
    name: 'Carlos Hernandez',
    email: 'carlos@example.com'
  },
  {
    id: '12',
    name: 'Ashley Brown',
    email: 'ashley@example.com'
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
    isPublic: false,
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
    isPublic: false,
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-06-10T16:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-06-10T15:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-06-10T17:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'not-going', joinedAt: '2024-06-10T18:00:00Z' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
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
    isPublic: false,
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-06-15T20:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-06-15T21:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-06-15T22:00:00Z' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1489599689654-03c4f703b45b?w=400&h=300&fit=crop'
    ]
  },
  {
    id: '4',
    name: 'Private Game Night',
    description: 'Board games and pizza with close friends only. Bring your competitive spirit!',
    date: '2024-06-30',
    time: '19:30',
    location: "Sarah's Place",
    organizerId: '2',
    organizer: mockUsers[1],
    hasExpenseSplitting: true,
    createdAt: '2024-06-18T14:00:00Z',
    isPublic: false,
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-06-18T15:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-06-18T14:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'not-going', joinedAt: '2024-06-18T16:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'maybe', joinedAt: '2024-06-18T17:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'going', joinedAt: '2024-06-18T18:00:00Z' },
      { userId: '6', user: mockUsers[5], status: 'not-going', joinedAt: '2024-06-18T19:00:00Z' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=400&h=300&fit=crop'
    ]
  },
  {
    id: '5',
    name: 'Coachella 2024',
    description: 'Music festival weekend! Who\'s ready to dance under the desert sun? Let me know if you got your tickets!',
    date: '2024-08-10',
    time: '12:00',
    location: 'Coachella Valley, Indio, CA',
    organizerId: '1',
    organizer: mockUsers[0],
    hasExpenseSplitting: true,
    createdAt: '2024-06-01T08:00:00Z',
    isPublic: false,
    ticketUrl: 'https://coachella.com/tickets',
    ticketPrice: 429,
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-06-01T08:00:00Z', hasPurchasedTicket: true },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-06-01T09:00:00Z', hasPurchasedTicket: true },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-06-01T10:00:00Z', hasPurchasedTicket: false },
      { userId: '4', user: mockUsers[3], status: 'maybe', joinedAt: '2024-06-01T11:00:00Z', hasPurchasedTicket: false },
      { userId: '5', user: mockUsers[4], status: 'not-going', joinedAt: '2024-06-01T12:00:00Z', hasPurchasedTicket: false },
      { userId: '6', user: mockUsers[5], status: 'going', joinedAt: '2024-06-01T13:00:00Z', hasPurchasedTicket: true },
      { userId: '7', user: mockUsers[6], status: 'maybe', joinedAt: '2024-06-01T14:00:00Z', hasPurchasedTicket: false },
      { userId: '8', user: mockUsers[7], status: 'going', joinedAt: '2024-06-01T15:00:00Z', hasPurchasedTicket: false }
    ],
    photos: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop'
    ]
  }
];

export const mockPublicEvents: Event[] = [
  {
    id: 'pub1',
    name: 'Summer Music Festival',
    description: 'Join hundreds of music lovers for an amazing outdoor festival featuring local bands and food trucks.',
    date: '2024-07-20',
    time: '14:00',
    location: 'Central Park Amphitheater',
    organizerId: '6',
    organizer: mockUsers[5],
    hasExpenseSplitting: false,
    createdAt: '2024-06-01T09:00:00Z',
    isPublic: true,
    ticketUrl: 'https://eventbrite.com/summer-music-fest',
    ticketPrice: 45,
    attendees: [
      { userId: '6', user: mockUsers[5], status: 'going', joinedAt: '2024-06-01T09:00:00Z' },
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-06-02T10:00:00Z' },
      { userId: '7', user: mockUsers[6], status: 'maybe', joinedAt: '2024-06-03T11:00:00Z' },
      { userId: '8', user: mockUsers[7], status: 'going', joinedAt: '2024-06-04T12:00:00Z' },
      { userId: '9', user: mockUsers[8], status: 'going', joinedAt: '2024-06-05T13:00:00Z' },
      { userId: '10', user: mockUsers[9], status: 'maybe', joinedAt: '2024-06-06T14:00:00Z' },
      { userId: '11', user: mockUsers[10], status: 'going', joinedAt: '2024-06-07T15:00:00Z' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
    ]
  },
  {
    id: 'pub2',
    name: 'Community Art Workshop',
    description: 'Free painting workshop for all skill levels. Materials provided. Come create and connect with fellow artists!',
    date: '2024-06-28',
    time: '10:00',
    location: 'Downtown Community Center',
    organizerId: '7',
    organizer: mockUsers[6],
    hasExpenseSplitting: false,
    createdAt: '2024-06-05T12:00:00Z',
    isPublic: true,
    attendees: [
      { userId: '7', user: mockUsers[6], status: 'going', joinedAt: '2024-06-05T12:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-06-06T13:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-06-07T14:00:00Z' },
      { userId: '8', user: mockUsers[7], status: 'maybe', joinedAt: '2024-06-08T15:00:00Z' },
      { userId: '9', user: mockUsers[8], status: 'going', joinedAt: '2024-06-09T16:00:00Z' },
      { userId: '11', user: mockUsers[10], status: 'going', joinedAt: '2024-06-10T17:00:00Z' }
    ]
  },
  {
    id: 'pub3',
    name: 'Food Truck Friday',
    description: 'Weekly gathering of the best food trucks in the city. Come hungry and discover new flavors!',
    date: '2024-06-21',
    time: '11:30',
    location: 'City Square',
    organizerId: '6',
    organizer: mockUsers[5],
    hasExpenseSplitting: false,
    createdAt: '2024-06-10T16:00:00Z',
    isPublic: true,
    attendees: [
      { userId: '6', user: mockUsers[5], status: 'going', joinedAt: '2024-06-10T16:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-06-11T17:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'maybe', joinedAt: '2024-06-12T18:00:00Z' },
      { userId: '8', user: mockUsers[7], status: 'going', joinedAt: '2024-06-13T19:00:00Z' },
      { userId: '10', user: mockUsers[9], status: 'going', joinedAt: '2024-06-14T20:00:00Z' },
      { userId: '11', user: mockUsers[10], status: 'maybe', joinedAt: '2024-06-15T21:00:00Z' }
    ]
  },
  {
    id: 'pub4',
    name: 'Tech Startup Networking',
    description: 'Connect with fellow entrepreneurs and tech enthusiasts. Pitch your ideas and find co-founders!',
    date: '2024-07-05',
    time: '18:00',
    location: 'Innovation Hub Downtown',
    organizerId: '8',
    organizer: mockUsers[7],
    hasExpenseSplitting: true,
    createdAt: '2024-06-08T14:00:00Z',
    isPublic: true,
    ticketPrice: 25,
    attendees: [
      { userId: '8', user: mockUsers[7], status: 'going', joinedAt: '2024-06-08T14:00:00Z' },
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-06-09T15:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'maybe', joinedAt: '2024-06-10T16:00:00Z' },
      { userId: '9', user: mockUsers[8], status: 'going', joinedAt: '2024-06-11T17:00:00Z' },
      { userId: '10', user: mockUsers[9], status: 'going', joinedAt: '2024-06-12T18:00:00Z' }
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
  },
  {
    id: '3',
    eventId: 'pub4',
    name: 'Venue Rental',
    amount: 300,
    paidBy: '8',
    splitBetween: ['8', '1', '9', '10'],
    createdAt: '2024-06-08T14:00:00Z',
    payments: [
      { id: '9', expenseId: '3', userId: '8', amount: 75, status: 'paid', paidAt: '2024-06-08T14:00:00Z' },
      { id: '10', expenseId: '3', userId: '1', amount: 75, status: 'pending' },
      { id: '11', expenseId: '3', userId: '9', amount: 75, status: 'paid', paidAt: '2024-06-09T15:00:00Z' },
      { id: '12', expenseId: '3', userId: '10', amount: 75, status: 'pending' }
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
  },
  {
    id: '4',
    eventId: '4',
    userId: '1',
    user: mockUsers[0],
    message: 'What games are we playing? I can bring Settlers of Catan!',
    createdAt: '2024-06-19T10:00:00Z'
  },
  {
    id: '5',
    eventId: '4',
    userId: '2',
    user: mockUsers[1],
    message: 'Perfect! I have Ticket to Ride too. This is going to be fun! 🎲',
    createdAt: '2024-06-19T11:30:00Z'
  },
  {
    id: '6',
    eventId: '5',
    userId: '2',
    user: mockUsers[1],
    message: 'Just got my ticket! Who else is confirmed?',
    createdAt: '2024-06-02T10:00:00Z'
  },
  {
    id: '7',
    eventId: '5',
    userId: '6',
    user: mockUsers[5],
    message: 'Got mine too! This is going to be epic! 🎵',
    createdAt: '2024-06-02T11:00:00Z'
  }
];
