import { User, Event, Expense, Comment, EventPhoto } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'Javier García', email: 'javier.garcia@example.com', avatar: 'https://i.pravatar.cc/150?img=1', phone: '+34666555444' },
  { id: '2', name: 'Maria Rodriguez', email: 'maria.rodriguez@example.com', avatar: 'https://i.pravatar.cc/150?img=2', phone: '+34666555333' },
  { id: '3', name: 'Carlos Martinez', email: 'carlos.martinez@example.com', avatar: 'https://i.pravatar.cc/150?img=3', phone: '+34666555222' },
  { id: '4', name: 'Sofia Lopez', email: 'sofia.lopez@example.com', avatar: 'https://i.pravatar.cc/150?img=4', phone: '+34666555111' },
  { id: '5', name: 'Luis Hernandez', email: 'luis.hernandez@example.com', avatar: 'https://i.pravatar.cc/150?img=5', phone: '+34666555000' },
  { id: '6', name: 'Ana Perez', email: 'ana.perez@example.com', avatar: 'https://i.pravatar.cc/150?img=6', phone: '+34666444999' },
  { id: '7', name: 'David Gomez', email: 'david.gomez@example.com', avatar: 'https://i.pravatar.cc/150?img=7', phone: '+34666444888' },
  { id: '8', name: 'Laura Diaz', email: 'laura.diaz@example.com', avatar: 'https://i.pravatar.cc/150?img=8', phone: '+34666444777' },
  { id: '9', name: 'Pablo Moreno', email: 'pablo.moreno@example.com', avatar: 'https://i.pravatar.cc/150?img=9', phone: '+34666444666' },
  { id: '10', name: 'Elena Jimenez', email: 'elena.jimenez@example.com', avatar: 'https://i.pravatar.cc/150?img=10', phone: '+34666444555' },
  { id: '11', name: 'Adrian Romero', email: 'adrian.romero@example.com', avatar: 'https://i.pravatar.cc/150?img=11', phone: '+34666444444' },
  { id: '12', name: 'Raquel Navarro', email: 'raquel.navarro@example.com', avatar: 'https://i.pravatar.cc/150?img=12', phone: '+34666444333' }
];

export const mockCurrentUser: User = mockUsers[0]; // Javier García is the current user

export const mockEvents: Event[] = [
  // --- PRIVATE EVENTS ORGANIZED BY CURRENT USER (Javier) ---
  {
    id: '1',
    name: 'Pachá VIP Night',
    description: 'VIP tables at Pachá Barcelona. Let\'s celebrate the weekend in style!',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
    time: '11:30 PM',
    location: 'Pachá Barcelona, Port Olímpic',
    organizerId: '1',
    organizer: mockUsers[0],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-01T10:00:00Z', ticketStatus: 'purchased' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-01-02T11:00:00Z', ticketStatus: 'purchased' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-01-03T12:00:00Z', ticketStatus: 'pending' },
    ],
    createdAt: '2024-01-01T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    ticketPrice: 50.00,
    comments: [
      { id: 'c1', eventId: '1', userId: '2', user: mockUsers[1], message: "Can't wait for this VIP night! 🎉", createdAt: '2024-01-02T15:00:00Z' },
      { id: 'c1b', eventId: '1', userId: '3', user: mockUsers[2], message: "The lineup is going to be amazing", createdAt: '2024-01-03T12:30:00Z' },
    ],
  },
  {
    id: '2',
    name: 'Beach Volleyball & Sunset',
    description: 'Let\'s play some volleyball at Bogatell beach and then watch the sunset with some drinks.',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
    time: '4:00 PM',
    location: 'Bogatell Beach, Poblenou',
    organizerId: '1',
    organizer: mockUsers[0],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-15T10:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-01-16T11:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'maybe', joinedAt: '2024-01-17T12:00:00Z' },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: false,
    comments: [
      { id: 'c2', eventId: '2', userId: '4', user: mockUsers[3], message: "Perfect weather for volleyball! 🏐", createdAt: '2024-01-18T14:00:00Z' },
      { id: 'c2b', eventId: '2', userId: '5', user: mockUsers[4], message: "I'll bring the drinks for sunset", createdAt: '2024-01-19T10:30:00Z' },
    ],
  },

  // --- PRIVATE EVENTS ORGANIZED BY OTHERS ---
  {
    id: '3',
    name: 'Barça vs Atlético Watch Party',
    description: 'El Partidazo! Watching the Barça game at a cool sports bar in Gràcia. Big screen, good beer, and great company.',
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 8 days from now
    time: '9:00 PM',
    location: 'Belushi\'s, Eixample',
    organizerId: '2',
    organizer: mockUsers[1],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-20T10:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-01-21T11:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-01-22T12:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'maybe', joinedAt: '2024-01-23T13:00:00Z' },
    ],
    createdAt: '2024-01-20T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    comments: [
      { id: 'c3', eventId: '3', userId: '3', user: mockUsers[2], message: "Visca Barça! 🔵🔴", createdAt: '2024-01-24T16:00:00Z' },
      { id: 'c3b', eventId: '3', userId: '1', user: mockUsers[0], message: "This is going to be intense!", createdAt: '2024-01-25T11:00:00Z' },
    ],
  },
  {
    id: '4',
    name: 'Sutton Club Night',
    description: 'Another big club night, this time at Sutton. Let\'s check out the scene there.',
    date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 12 days from now
    time: '11:00 PM',
    location: 'Sutton Club, Eixample',
    organizerId: '4',
    organizer: mockUsers[3],
    attendees: [
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-02-05T10:00:00Z', ticketStatus: 'purchased' },
      { userId: '1', user: mockUsers[0], status: 'maybe', joinedAt: '2024-02-06T11:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'going', joinedAt: '2024-02-07T12:00:00Z', ticketStatus: 'purchased' }
    ],
    createdAt: '2024-02-05T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    ticketPrice: 25.00,
    comments: [
      { id: 'c4', eventId: '4', userId: '5', user: mockUsers[4], message: "Sutton is always a great time! 🎵", createdAt: '2024-02-08T13:00:00Z' },
      { id: 'c4b', eventId: '4', userId: '1', user: mockUsers[0], message: "I've heard great things about this place", createdAt: '2024-02-09T15:30:00Z' },
    ],
  },

  // --- PUBLIC EVENTS ---
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
      { id: 'c5b', eventId: '5', userId: '4', user: mockUsers[3], message: "Can't wait for this! Who else is going?", createdAt: '2024-05-21T10:30:00Z' },
      { id: 'c5c', eventId: '5', userId: '1', user: mockUsers[0], message: "I've been waiting for this all year! 🎵", createdAt: '2024-05-22T16:45:00Z' },
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
    comments: [
      { id: 'c6', eventId: '6', userId: '3', user: mockUsers[2], message: "The electronic music scene here is incredible!", createdAt: '2024-02-16T14:00:00Z' },
      { id: 'c6b', eventId: '6', userId: '5', user: mockUsers[4], message: "Can't wait for the technology exhibits", createdAt: '2024-02-17T11:30:00Z' },
    ],
    totalAttendees: 85000
  },
  {
    id: '7',
    name: 'Brunch in the Park',
    description: 'An open-air electronic music festival in the beautiful Jardins de Joan Brossa. Great music, food trucks, and a relaxed vibe.',
    date: '2024-07-21',
    time: '1:00 PM',
    location: 'Jardins de Joan Brossa, Montjuïc',
    organizerId: '10',
    organizer: mockUsers[9],
    attendees: [],
    createdAt: '2024-05-15T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: true,
    isPromoted: true,
    ticketPrice: 45.00,
    discountPercentage: 10,
    ticketUrl: 'https://barcelona.brunch-in.com/',
    comments: [
      { id: 'c7', eventId: '7', userId: '6', user: mockUsers[5], message: "Perfect summer vibes! 🌞", createdAt: '2024-05-25T12:00:00Z' },
      { id: 'c7b', eventId: '7', userId: '7', user: mockUsers[6], message: "The food trucks are amazing here", createdAt: '2024-05-26T14:30:00Z' },
    ],
    totalAttendees: 15000
  },

  // --- PAST EVENTS (RECENT) ---
  {
    id: '8',
    name: 'Duki Concert at Razzmatazz',
    description: 'Incredible night with Duki at Razzmatazz! The energy was absolutely insane.',
    date: '2024-01-15',
    time: '10:00 PM',
    location: 'Razzmatazz, Poblenou',
    organizerId: '3',
    organizer: mockUsers[2],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-10T10:00:00Z', ticketStatus: 'purchased' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-01-11T11:00:00Z', ticketStatus: 'purchased' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-01-12T12:00:00Z', ticketStatus: 'purchased' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-01-13T13:00:00Z', ticketStatus: 'purchased' },
    ],
    createdAt: '2024-01-10T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: false,
    ticketPrice: 35.00,
    comments: [
      { id: 'c8', eventId: '8', userId: '1', user: mockUsers[0], message: "Best concert ever! Duki killed it 🔥", createdAt: '2024-01-16T02:30:00Z' },
      { id: 'c8b', eventId: '8', userId: '2', user: mockUsers[1], message: "The crowd was absolutely wild!", createdAt: '2024-01-16T03:00:00Z' },
      { id: 'c8c', eventId: '8', userId: '4', user: mockUsers[3], message: "Can't believe we got to see him live!", createdAt: '2024-01-16T10:15:00Z' },
    ],
    photos: [
      {
        id: '8',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '1',
        uploadedAt: '2024-01-16T02:45:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['2', '3', '4']
      }
    ]
  },
  {
    id: '9',
    name: 'Tennis Match - Friends Tournament',
    description: 'Friendly tennis tournament with friends at the local club. Great competition and lots of fun!',
    date: '2024-01-20',
    time: '3:00 PM',
    location: 'Tennis Club Barcelona, Sarrià',
    organizerId: '5',
    organizer: mockUsers[4],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-18T10:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'going', joinedAt: '2024-01-18T11:00:00Z' },
      { userId: '6', user: mockUsers[5], status: 'going', joinedAt: '2024-01-19T12:00:00Z' },
      { userId: '7', user: mockUsers[6], status: 'going', joinedAt: '2024-01-19T13:00:00Z' },
    ],
    createdAt: '2024-01-18T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    comments: [
      { id: 'c9', eventId: '9', userId: '5', user: mockUsers[4], message: "Great match everyone! Next time I'll win 😄", createdAt: '2024-01-20T18:00:00Z' },
      { id: 'c9b', eventId: '9', userId: '1', user: mockUsers[0], message: "Amazing tournament! The weather was perfect", createdAt: '2024-01-20T18:30:00Z' },
      { id: 'c9c', eventId: '9', userId: '6', user: mockUsers[5], message: "Thanks for organizing this! 🎾", createdAt: '2024-01-20T19:00:00Z' },
    ],
    photos: [
      {
        id: '9',
        url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '5',
        uploadedAt: '2024-01-20T18:15:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['1', '6', '7']
      }
    ]
  },
  {
    id: '10',
    name: 'Tapas Tour in Gràcia',
    description: 'Exploring the best tapas bars in Gràcia neighborhood. Amazing food and great company!',
    date: '2024-01-25',
    time: '8:00 PM',
    location: 'Gràcia, Barcelona',
    organizerId: '2',
    organizer: mockUsers[1],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-22T10:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-01-22T11:00:00Z' },
      { userId: '8', user: mockUsers[7], status: 'going', joinedAt: '2024-01-23T12:00:00Z' },
      { userId: '9', user: mockUsers[8], status: 'going', joinedAt: '2024-01-24T13:00:00Z' },
    ],
    createdAt: '2024-01-22T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    comments: [
      { id: 'c10', eventId: '10', userId: '2', user: mockUsers[1], message: "The patatas bravas at that first place were incredible!", createdAt: '2024-01-25T22:00:00Z' },
      { id: 'c10b', eventId: '10', userId: '1', user: mockUsers[0], message: "Best tapas tour ever! 🍷", createdAt: '2024-01-25T22:30:00Z' },
      { id: 'c10c', eventId: '10', userId: '8', user: mockUsers[7], message: "We should do this again next month!", createdAt: '2024-01-26T10:00:00Z' },
    ],
    photos: [
      {
        id: '10',
        url: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '2',
        uploadedAt: '2024-01-25T21:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['1', '8', '9']
      }
    ]
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
