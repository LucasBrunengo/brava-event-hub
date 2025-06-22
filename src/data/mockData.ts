import { User, Event, Expense, Comment, EventPhoto } from '@/types';

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
  {
    id: '6',
    name: 'Frank Garcia',
    email: 'frank.garcia@example.com',
    avatar: 'https://i.pravatar.cc/150?img=6',
    phone: '+34666444999'
  },
  {
    id: '7',
    name: 'Grace Lee',
    email: 'grace.lee@example.com',
    avatar: 'https://i.pravatar.cc/150?img=7',
    phone: '+34666444888'
  },
  {
    id: '8',
    name: 'Henry Wilson',
    email: 'henry.wilson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
    phone: '+34666444777'
  },
  {
    id: '9',
    name: 'Iris Chen',
    email: 'iris.chen@example.com',
    avatar: 'https://i.pravatar.cc/150?img=9',
    phone: '+34666444666'
  },
  {
    id: '10',
    name: 'Jack Davis',
    email: 'jack.davis@example.com',
    avatar: 'https://i.pravatar.cc/150?img=10',
    phone: '+34666444555'
  },
  {
    id: '11',
    name: 'Kate Rodriguez',
    email: 'kate.rodriguez@example.com',
    avatar: 'https://i.pravatar.cc/150?img=11',
    phone: '+34666444444'
  },
  {
    id: '12',
    name: 'Liam Taylor',
    email: 'liam.taylor@example.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    phone: '+34666444333'
  },
  {
    id: '13',
    name: 'Maya Patel',
    email: 'maya.patel@example.com',
    avatar: 'https://i.pravatar.cc/150?img=13',
    phone: '+34666444222'
  },
  {
    id: '14',
    name: 'Noah Anderson',
    email: 'noah.anderson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=14',
    phone: '+34666444111'
  },
  {
    id: '15',
    name: 'Olivia Martin',
    email: 'olivia.martin@example.com',
    avatar: 'https://i.pravatar.cc/150?img=15',
    phone: '+34666444000'
  },
  {
    id: '16',
    name: 'Paul Thompson',
    email: 'paul.thompson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=16',
    phone: '+34666333999'
  },
  {
    id: '17',
    name: 'Quinn Walker',
    email: 'quinn.walker@example.com',
    avatar: 'https://i.pravatar.cc/150?img=17',
    phone: '+34666333888'
  },
  {
    id: '18',
    name: 'Rachel Green',
    email: 'rachel.green@example.com',
    avatar: 'https://i.pravatar.cc/150?img=18',
    phone: '+34666333777'
  },
  {
    id: '19',
    name: 'Sam Johnson',
    email: 'sam.johnson@example.com',
    avatar: 'https://i.pravatar.cc/150?img=19',
    phone: '+34666333666'
  },
  {
    id: '20',
    name: 'Tina Lopez',
    email: 'tina.lopez@example.com',
    avatar: 'https://i.pravatar.cc/150?img=20',
    phone: '+34666333555'
  },
  {
    id: '21',
    name: 'Victor Brown',
    email: 'victor.brown@example.com',
    avatar: 'https://i.pravatar.cc/150?img=21',
    phone: '+34666333444'
  },
  {
    id: '22',
    name: 'Wendy Clark',
    email: 'wendy.clark@example.com',
    avatar: 'https://i.pravatar.cc/150?img=22',
    phone: '+34666333333'
  },
  {
    id: '23',
    name: 'Xavier Kim',
    email: 'xavier.kim@example.com',
    avatar: 'https://i.pravatar.cc/150?img=23',
    phone: '+34666333222'
  },
  {
    id: '24',
    name: 'Yara Singh',
    email: 'yara.singh@example.com',
    avatar: 'https://i.pravatar.cc/150?img=24',
    phone: '+34666333111'
  },
  {
    id: '25',
    name: 'Zoe Williams',
    email: 'zoe.williams@example.com',
    avatar: 'https://i.pravatar.cc/150?img=25',
    phone: '+34666333000'
  },
];

// Export the current user (Alice Johnson)
export const mockCurrentUser: User = mockUsers[0];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Bling Bling Club Night',
    description: 'Exclusive night out at the hottest club in Barcelona! VIP tables, bottle service, and the best electronic music. Dress to impress!',
    date: '2024-02-15',
    time: '11:00 PM',
    location: 'Bling Bling Club, Eixample',
    organizerId: '1',
    organizer: mockUsers[0],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-01T10:00:00Z', ticketStatus: 'purchased' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-01-02T11:00:00Z', ticketStatus: 'purchased' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-01-03T12:00:00Z', ticketStatus: 'pending' },
      { userId: '4', user: mockUsers[3], status: 'maybe', joinedAt: '2024-01-04T13:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'not-going', joinedAt: '2024-01-05T14:00:00Z' }
    ],
    createdAt: '2024-01-01T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    ticketPrice: 35.00,
    photos: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '1',
        uploadedAt: '2024-01-10T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['2', '3']
      }
    ],
    comments: [
      { id: 'c1', eventId: '1', userId: '2', user: mockUsers[1], message: "Can't wait! I'll bring some friends.", createdAt: '2024-02-12T10:00:00Z' },
      { id: 'c2', eventId: '1', userId: '3', user: mockUsers[2], message: "What's the dress code?", createdAt: '2024-02-12T11:00:00Z' }
    ]
  },
  {
    id: '2',
    name: 'FC Barcelona vs Real Madrid',
    description: 'El Clásico! The biggest football match of the season. Let\'s watch it together at a sports bar with great atmosphere and drinks.',
    date: '2024-02-20',
    time: '9:00 PM',
    location: 'Sports Bar Central, Gràcia',
    organizerId: '2',
    organizer: mockUsers[1],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-15T10:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-01-16T11:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-01-17T12:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'maybe', joinedAt: '2024-01-18T13:00:00Z' },
      { userId: '6', user: mockUsers[5], status: 'going', joinedAt: '2024-01-19T14:00:00Z' }
    ],
    createdAt: '2024-01-15T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    photos: [
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '2',
        uploadedAt: '2024-01-20T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['1', '3']
      }
    ],
    comments: [
      { id: 'c3', eventId: '2', userId: '3', user: mockUsers[2], message: "Visca Barça! 🔵🔴", createdAt: '2024-02-18T14:00:00Z' },
    ]
  },
  {
    id: '3',
    name: 'Beach Day at Barceloneta',
    description: 'Perfect day for the beach! We\'ll bring volleyball, music, and snacks. Join us for a fun day in the sun!',
    date: '2024-02-25',
    time: '12:00 PM',
    location: 'Barceloneta Beach',
    organizerId: '1',
    organizer: mockUsers[0],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-20T10:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-01-21T11:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'going', joinedAt: '2024-01-22T12:00:00Z' },
      { userId: '7', user: mockUsers[6], status: 'maybe', joinedAt: '2024-01-23T13:00:00Z' }
    ],
    createdAt: '2024-01-20T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    photos: [
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '1',
        uploadedAt: '2024-01-25T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['4', '5']
      }
    ],
    comments: [
      { id: 'c4', eventId: '3', userId: '4', user: mockUsers[3], message: "I'll bring the volleyball! 🏐", createdAt: '2024-02-22T10:00:00Z' },
    ]
  },
  {
    id: '4',
    name: 'Razzmatazz Night Out',
    description: 'The most iconic club in Barcelona! Join us for an unforgettable night of electronic music and dancing.',
    date: '2024-03-01',
    time: '11:30 PM',
    location: 'Razzmatazz Club',
    organizerId: '3',
    organizer: mockUsers[2],
    attendees: [
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-01-25T10:00:00Z', ticketStatus: 'purchased' },
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-26T11:00:00Z', ticketStatus: 'purchased' },
      { userId: '2', user: mockUsers[1], status: 'maybe', joinedAt: '2024-01-27T12:00:00Z' },
      { userId: '8', user: mockUsers[7], status: 'going', joinedAt: '2024-01-28T13:00:00Z', ticketStatus: 'pending' }
    ],
    createdAt: '2024-01-25T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: false,
    ticketPrice: 25.00,
    photos: [
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '3',
        uploadedAt: '2024-01-30T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['1', '8']
      }
    ]
  },
  {
    id: '5',
    name: 'Primavera Sound Festival',
    description: 'The biggest music festival in Barcelona! Join us for an incredible lineup featuring international artists and local talent.',
    date: '2024-06-01',
    time: '4:00 PM',
    location: 'Parc del Fòrum',
    organizerId: '2',
    organizer: mockUsers[1],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-15T10:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-01-16T11:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-01-17T12:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'maybe', joinedAt: '2024-01-18T13:00:00Z' }
    ],
    createdAt: '2024-01-15T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: true,
    isPromoted: true,
    ticketPrice: 89.99,
    discountPercentage: 15,
    ticketUrl: 'https://www.primaverasound.com',
    photos: [
      {
        id: '5',
        url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '1',
        uploadedAt: '2024-01-20T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['2', '3']
      }
    ],
    comments: [
      { id: 'c5', eventId: '5', userId: '3', user: mockUsers[2], message: "The lineup this year is insane!", createdAt: '2024-05-20T14:00:00Z' },
    ],
    totalAttendees: 220000
  },
  {
    id: '6',
    name: 'Sónar Festival',
    description: 'The world\'s most advanced music, creativity and technology festival. Experience cutting-edge electronic music and digital art.',
    date: '2024-06-13',
    time: '2:00 PM',
    location: 'Fira Barcelona',
    organizerId: '2',
    organizer: mockUsers[1],
    attendees: [
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-02-10T10:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-02-11T11:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'maybe', joinedAt: '2024-02-12T12:00:00Z' }
    ],
    createdAt: '2024-02-10T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: true,
    isPromoted: true,
    ticketPrice: 120.00,
    discountPercentage: 10,
    ticketUrl: 'https://www.sonar.es',
    photos: [
      {
        id: '6',
        url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '2',
        uploadedAt: '2024-02-15T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['3']
      }
    ],
    totalAttendees: 85000
  },
  {
    id: '7',
    name: 'Sunset Yoga on the Beach',
    description: 'Relax and rejuvenate with a peaceful yoga session as the sun sets over the Mediterranean. All levels welcome.',
    date: '2024-02-28',
    time: '7:30 PM',
    location: 'Nova Icaria Beach',
    organizerId: '5',
    organizer: mockUsers[4],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-28T10:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'going', joinedAt: '2024-01-29T11:00:00Z' }
    ],
    createdAt: '2024-01-28T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: true,
    ticketPrice: 12.00,
    photos: [
      {
        id: '7',
        url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '5',
        uploadedAt: '2024-02-01T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['1']
      }
    ]
  },
  {
    id: '8',
    name: 'Duki Concert - Palau Sant Jordi',
    description: 'The Argentine trap superstar is coming to Barcelona! Don\'t miss this incredible show with special guests.',
    date: '2024-03-15',
    time: '9:00 PM',
    location: 'Palau Sant Jordi',
    organizerId: '1',
    organizer: mockUsers[0],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-30T10:00:00Z', ticketStatus: 'purchased' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-01-31T11:00:00Z', ticketStatus: 'purchased' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-02-01T12:00:00Z', ticketStatus: 'pending' },
      { userId: '4', user: mockUsers[3], status: 'maybe', joinedAt: '2024-02-02T13:00:00Z' }
    ],
    createdAt: '2024-01-30T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: false,
    ticketPrice: 65.00,
    ticketUrl: 'https://www.ticketmaster.es',
    photos: [
      {
        id: '8',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '1',
        uploadedAt: '2024-02-05T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['2', '3']
      }
    ]
  },
  {
    id: '9',
    name: 'Razzmatazz Club Night',
    description: 'The most iconic club in Barcelona! Join us for an unforgettable night of electronic music and dancing.',
    date: '2024-03-08',
    time: '11:00 PM',
    location: 'Razzmatazz Club',
    organizerId: '4',
    organizer: mockUsers[3],
    attendees: [
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-02-05T10:00:00Z' },
      { userId: '1', user: mockUsers[0], status: 'maybe', joinedAt: '2024-02-06T11:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-02-07T12:00:00Z' }
    ],
    createdAt: '2024-02-05T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: true,
    ticketPrice: 20.00,
    ticketUrl: 'https://www.razzmatazz.com',
    photos: [
      {
        id: '9',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '4',
        uploadedAt: '2024-02-10T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['1', '2']
      }
    ]
  },
  {
    id: '10',
    name: 'Fever Mystery Dinner',
    description: 'An immersive mystery dinner experience! Solve a thrilling case while enjoying a gourmet meal in a secret location.',
    date: '2024-03-22',
    time: '8:00 PM',
    location: 'Secret Location (revealed 24h before)',
    organizerId: '5',
    organizer: mockUsers[4],
    attendees: [
      { userId: '5', user: mockUsers[4], status: 'going', joinedAt: '2024-02-15T10:00:00Z' },
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-02-16T11:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'maybe', joinedAt: '2024-02-17T12:00:00Z' }
    ],
    createdAt: '2024-02-15T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: true,
    ticketPrice: 45.00,
    ticketUrl: 'https://feverup.com',
    photos: [
      {
        id: '11',
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '5',
        uploadedAt: '2024-02-20T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['1']
      }
    ]
  },
  {
    id: '11',
    name: 'Private Party at Sutton Club',
    description: 'Exclusive access to a private party at one of Barcelona\'s top clubs. Great music, great people, and an unforgettable night.',
    date: '2024-04-05',
    time: '11:30 PM',
    location: 'Sutton Club, Barcelona',
    organizerId: '1',
    organizer: mockUsers[0],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-03-10T10:00:00Z', ticketStatus: 'purchased' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-03-10T11:00:00Z', ticketStatus: 'purchased' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-03-11T12:00:00Z', ticketStatus: 'pending' },
      { userId: '5', user: mockUsers[4], status: 'maybe', joinedAt: '2024-03-12T13:00:00Z' }
    ],
    createdAt: '2024-03-10T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: false,
    ticketPrice: 30.00,
    photos: []
  }
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
    message: 'Can\'t wait for the BBQ! I\'ll bring the drinks.',
    createdAt: '2024-01-02T10:00:00Z'
  },
  {
    id: '2',
    eventId: '1',
    userId: '3',
    user: mockUsers[2],
    message: 'I\'ll bring some snacks too!',
    createdAt: '2024-01-02T11:00:00Z'
  },
  {
    id: '3',
    eventId: '2',
    userId: '4',
    user: mockUsers[3],
    message: 'This is going to be amazing!',
    createdAt: '2024-01-03T10:00:00Z'
  }
];

// Mock Notifications
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

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'event_invite',
    title: 'New Event Invitation',
    message: 'Bob invited you to "Salsa Night" on September 5th',
    userId: '1',
    relatedEventId: '5',
    relatedUserId: '2',
    isRead: false,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    type: 'payment_request',
    title: 'Payment Request',
    message: 'Charlie requested €25 for "Tapas Tour" expenses',
    userId: '1',
    relatedEventId: '4',
    relatedUserId: '3',
    isRead: false,
    createdAt: '2024-01-14T15:30:00Z'
  },
  {
    id: '3',
    type: 'event_update',
    title: 'Event Updated',
    message: 'The "Beach BBQ Party" time has been changed to 7:00 PM',
    userId: '1',
    relatedEventId: '1',
    isRead: true,
    createdAt: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    type: 'reminder',
    title: 'Event Reminder',
    message: 'Your "Sunset Yoga" event starts in 2 hours',
    userId: '1',
    relatedEventId: '6',
    isRead: false,
    createdAt: '2024-01-12T16:00:00Z'
  },
  {
    id: '5',
    type: 'message',
    title: 'New Message',
    message: 'Diana sent you a message about the upcoming event',
    userId: '1',
    relatedUserId: '4',
    isRead: false,
    createdAt: '2024-01-11T14:20:00Z'
  }
];

// Mock Messages
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

export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '1',
    sender: mockUsers[1],
    type: 'event_invite',
    content: 'Hey! I\'m organizing a Salsa Night next week. Want to join? It\'s going to be amazing! 🕺💃',
    eventId: '5',
    isRead: false,
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '2',
    sender: mockUsers[0],
    type: 'text',
    content: 'Sounds great! I\'d love to join. What time does it start?',
    isRead: true,
    createdAt: '2024-01-15T10:05:00Z'
  },
  {
    id: '3',
    senderId: '2',
    receiverId: '1',
    sender: mockUsers[1],
    type: 'text',
    content: 'It starts at 10 PM at El Born. Here\'s the event link:',
    eventId: '5',
    isRead: true,
    createdAt: '2024-01-15T10:10:00Z'
  },
  {
    id: '4',
    senderId: '3',
    receiverId: '1',
    sender: mockUsers[2],
    type: 'payment_request',
    content: 'Hey Alice! I owe you €25 from the Tapas Tour last week. Can you send me your payment details?',
    amount: 25,
    paymentMethods: ['Apple Pay', 'Google Pay', 'PayPal'],
    isRead: false,
    createdAt: '2024-01-14T15:30:00Z'
  },
  {
    id: '5',
    senderId: '4',
    receiverId: '1',
    sender: mockUsers[3],
    type: 'text',
    content: 'What should we do for the weekend? I was thinking we could organize something fun!',
    isRead: false,
    createdAt: '2024-01-13T14:00:00Z'
  },
  {
    id: '6',
    senderId: '1',
    receiverId: '4',
    sender: mockUsers[0],
    type: 'text',
    content: 'Great idea! How about a beach day or maybe a movie night?',
    isRead: true,
    createdAt: '2024-01-13T14:15:00Z'
  },
  {
    id: '7',
    senderId: '5',
    receiverId: '1',
    sender: mockUsers[4],
    type: 'event_invite',
    content: 'I\'m planning a sunset yoga session this weekend. Perfect for relaxation! 🧘‍♀️',
    eventId: '6',
    isRead: true,
    createdAt: '2024-01-12T11:00:00Z'
  }
];
