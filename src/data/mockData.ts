import { User, Event, Expense, Comment } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    phone: '+34666555444'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    phone: '+34666555333'
  },
  {
    id: '3',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    phone: '+34666555222'
  },
  {
    id: '4',
    name: 'Diana Miller',
    email: 'diana.miller@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    phone: '+34666555111'
  },
  {
    id: '5',
    name: 'Eva White',
    email: 'eva.white@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    phone: '+34666555000'
  },
];

// Export the current user (Alice Johnson)
export const mockCurrentUser: User = mockUsers[0];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Beach BBQ Party',
    description: 'Join us for a fun beach BBQ with great food, music, and sunset views! Bring your friends and appetite.',
    date: '2024-07-15',
    time: '6:00 PM',
    location: 'Barceloneta Beach',
    organizerId: '1',
    organizer: mockUsers[0],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-01T10:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-01-02T10:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'maybe', joinedAt: '2024-01-03T10:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'not-going', joinedAt: '2024-01-04T10:00:00Z' },
    ],
    createdAt: '2024-01-01T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    photos: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1615361200098-85735f739295?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop'
    ]
  },
  {
    id: '2',
    name: 'Primavera Sound Festival',
    description: 'The ultimate music festival experience in Barcelona! Three days of incredible artists, food, and unforgettable memories.',
    date: '2024-06-01',
    time: '4:00 PM',
    location: 'Park Güell',
    organizerId: '2',
    organizer: mockUsers[1],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-15T10:00:00Z', hasPurchasedTicket: true },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-01-16T10:00:00Z', hasPurchasedTicket: true },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-01-17T10:00:00Z', hasPurchasedTicket: false },
      { userId: '4', user: mockUsers[3], status: 'not-going', joinedAt: '2024-01-18T10:00:00Z', hasPurchasedTicket: false },
      { userId: '5', user: mockUsers[4], status: 'maybe', joinedAt: '2024-01-19T10:00:00Z', hasPurchasedTicket: false },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: false,
    ticketUrl: 'https://primaverasound.com/tickets',
    ticketPrice: 280,
    photos: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop'
    ]
  },
  {
    id: '3',
    name: 'Game Night',
    description: 'Board games, card games, and lots of fun! Perfect for a cozy evening with friends.',
    date: '2024-01-10',
    time: '7:00 PM',
    location: 'Gracia',
    organizerId: '3',
    organizer: mockUsers[2],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-05T10:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-01-05T10:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-01-06T10:00:00Z' },
    ],
    createdAt: '2024-01-05T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    photos: [
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=400&h=400&fit=crop'
    ]
  },
  {
    id: '4',
    name: 'Tapas Tour',
    description: 'Explore the best tapas bars in the Gothic Quarter. Sample delicious bites and local wines.',
    date: '2024-08-20',
    time: '7:30 PM',
    location: 'Gothic Quarter',
    organizerId: '1',
    organizer: mockUsers[0],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-02-01T10:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-02-02T10:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'maybe', joinedAt: '2024-02-03T10:00:00Z' },
    ],
    createdAt: '2024-02-01T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: true,
  },
  {
    id: '5',
    name: 'Salsa Night',
    description: 'Dance the night away at a lively salsa club in El Born. Beginners welcome!',
    date: '2024-09-05',
    time: '10:00 PM',
    location: 'El Born',
    organizerId: '2',
    organizer: mockUsers[1],
    attendees: [
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-02-15T10:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'maybe', joinedAt: '2024-02-16T10:00:00Z' },
    ],
    createdAt: '2024-02-15T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: true,
  },
  {
    id: '6',
    name: 'Sunset Yoga',
    description: 'Relax and rejuvenate with a sunset yoga session on the beach. All levels welcome.',
    date: '2024-07-22',
    time: '7:00 PM',
    location: 'Bogatell Beach',
    organizerId: '3',
    organizer: mockUsers[2],
    attendees: [
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-03-01T10:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-03-02T10:00:00Z' },
    ],
    createdAt: '2024-03-01T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: true,
  },
];

// Extract public events from mockEvents
export const mockPublicEvents: Event[] = mockEvents.filter(event => event.isPublic);

export const mockExpenses: Expense[] = [
  {
    id: '1',
    eventId: '1',
    name: 'Groceries for BBQ',
    amount: 120,
    paidBy: '1',
    splitBetween: ['2', '3', '4'],
    payments: [
      { id: '1', expenseId: '1', userId: '2', amount: 30, status: 'pending' },
      { id: '2', expenseId: '1', userId: '3', amount: 30, status: 'pending' },
      { id: '3', expenseId: '1', userId: '4', amount: 30, status: 'pending' },
    ],
    createdAt: '2024-01-02T10:00:00Z',
  },
  {
    id: '2',
    eventId: '3',
    name: 'Snacks and Drinks',
    amount: 50,
    paidBy: '3',
    splitBetween: ['1', '4'],
    payments: [
      { id: '4', expenseId: '2', userId: '1', amount: 25, status: 'pending' },
      { id: '5', expenseId: '2', userId: '4', amount: 25, status: 'pending' },
    ],
    createdAt: '2024-01-06T10:00:00Z',
  },
  {
    id: '3',
    eventId: '4',
    name: 'Tapas and Wine',
    amount: 80,
    paidBy: '1',
    splitBetween: ['2', '5'],
    payments: [
      { id: '6', expenseId: '3', userId: '2', amount: 40, status: 'pending' },
      { id: '7', expenseId: '3', userId: '5', amount: 40, status: 'pending' },
    ],
    createdAt: '2024-02-03T10:00:00Z',
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    eventId: '1',
    userId: '2',
    user: mockUsers[1],
    message: 'Sounds like a great plan! I\'ll bring the music.',
    createdAt: '2024-01-03T10:00:00Z',
  },
  {
    id: '2',
    eventId: '1',
    userId: '3',
    user: mockUsers[2],
    message: 'I might be a bit late, but I\'ll definitely be there!',
    createdAt: '2024-01-04T10:00:00Z',
  },
  {
    id: '3',
    eventId: '3',
    userId: '1',
    user: mockUsers[0],
    message: 'I\'m looking forward to the game night!',
    createdAt: '2024-01-07T10:00:00Z',
  },
];
