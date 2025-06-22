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
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), ticketStatus: 'purchased' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), ticketStatus: 'purchased' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), ticketStatus: 'pending' },
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    hasExpenseSplitting: true,
    isPublic: false,
    ticketPrice: 50.00,
    comments: [
      { id: 'c1', eventId: '1', userId: '2', user: mockUsers[1], message: "Can't wait for this VIP night! 🎉 The DJ is supposed to be amazing.", createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c1b', eventId: '1', userId: '3', user: mockUsers[2], message: "So excited! I've got my outfit ready.", createdAt: new Date(Date.now() - 1 * 12 * 60 * 60 * 1000).toISOString() },
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
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '5', user: mockUsers[4], status: 'maybe', joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    hasExpenseSplitting: false,
    isPublic: false,
    comments: [
      { id: 'c2', eventId: '2', userId: '4', user: mockUsers[3], message: "Praying for good weather! 🏐 I'm so ready.", createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c2b', eventId: '2', userId: '5', user: mockUsers[4], message: "I'll bring a cooler with some drinks for the sunset part.", createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
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
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '4', user: mockUsers[3], status: 'maybe', joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    hasExpenseSplitting: true,
    isPublic: false,
    comments: [
      { id: 'c3', eventId: '3', userId: '3', user: mockUsers[2], message: "Visca Barça! 🔵🔴 This is a must-win game.", createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c3b', eventId: '3', userId: '1', user: mockUsers[0], message: "It's going to be a tense one. Can't wait!", createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
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
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), ticketStatus: 'purchased' },
      { userId: '1', user: mockUsers[0], status: 'maybe', joinedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '5', user: mockUsers[4], status: 'going', joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), ticketStatus: 'purchased' }
    ],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    hasExpenseSplitting: true,
    isPublic: false,
    ticketPrice: 25.00,
    comments: [
      { id: 'c4', eventId: '4', userId: '5', user: mockUsers[4], message: "Sutton is always a good time! The music is top-notch.", createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c4b', eventId: '4', userId: '1', user: mockUsers[0], message: "Heard great things. Hopefully I can make it!", createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ],
  },

  // --- PUBLIC EVENTS ---
  {
    id: '5',
    name: 'Primavera Sound Festival',
    description: 'The biggest music festival in Barcelona! Join us for an incredible lineup featuring international artists and local talent.',
    date: '2024-08-01',
    time: '4:00 PM',
    location: 'Parc del Fòrum',
    organizerId: '2',
    organizer: mockUsers[1],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '4', user: mockUsers[3], status: 'maybe', joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() }
    ],
    createdAt: '2024-03-01T10:00:00Z',
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
        uploadedAt: '2023-06-02T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['2', '3']
      }
    ],
    comments: [
      { id: 'c5', eventId: '5', userId: '3', user: mockUsers[2], message: "The lineup this year is insane! So many good headliners.", createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c5b', eventId: '5', userId: '4', user: mockUsers[3], message: "Counting down the days! Who else is going from the group?", createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c5c', eventId: '5', userId: '1', user: mockUsers[0], message: "I've been waiting for this all year! 🎵 Let's coordinate where to meet.", createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    totalAttendees: 220000
  },
  {
    id: '6',
    name: 'Sónar Festival',
    description: 'The world\'s most advanced music, creativity and technology festival. Experience cutting-edge electronic music and digital art.',
    date: '2024-08-13',
    time: '2:00 PM',
    location: 'Fira Barcelona',
    organizerId: '2',
    organizer: mockUsers[1],
    attendees: [
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '5', user: mockUsers[4], status: 'maybe', joinedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() }
    ],
    createdAt: '2024-04-10T10:00:00Z',
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
        uploadedAt: '2023-06-14T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['3']
      }
    ],
    comments: [
      { id: 'c6', eventId: '6', userId: '3', user: mockUsers[2], message: "Sónar by Day is always a vibe. The tech part is fascinating.", createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c6b', eventId: '6', userId: '5', user: mockUsers[4], message: "Excited for the AV shows. Hope I can make it!", createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    totalAttendees: 85000
  },
  {
    id: '7',
    name: 'Brunch in the Park',
    description: 'An open-air electronic music festival in the beautiful Jardins de Joan Brossa. Great music, food trucks, and a relaxed vibe.',
    date: '2024-09-21',
    time: '1:00 PM',
    location: 'Jardins de Joan Brossa, Montjuïc',
    organizerId: '10',
    organizer: mockUsers[9],
    attendees: [],
    createdAt: '2024-06-15T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: true,
    isPromoted: true,
    ticketPrice: 45.00,
    discountPercentage: 10,
    ticketUrl: 'https://barcelona.brunch-in.com/',
    comments: [
      { id: 'c7', eventId: '7', userId: '6', user: mockUsers[5], message: "Perfect plan for a Sunday! 🌞", createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c7b', eventId: '7', userId: '7', user: mockUsers[6], message: "Their food truck selection is always on point.", createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    totalAttendees: 15000
  },

  // --- PAST EVENTS (RECENT) ---
  {
    id: '8',
    name: 'Duki Concert at Palau Sant Jordi',
    description: 'Incredible night with Duki at Palau Sant Jordi! The energy was absolutely insane.',
    date: '2024-05-15',
    time: '9:00 PM',
    location: 'Palau Sant Jordi, Montjuïc',
    organizerId: '3',
    organizer: mockUsers[2],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-05-10T10:00:00Z', ticketStatus: 'purchased' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-05-11T11:00:00Z', ticketStatus: 'purchased' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-05-12T12:00:00Z', ticketStatus: 'purchased' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-05-13T13:00:00Z', ticketStatus: 'purchased' },
    ],
    createdAt: '2024-05-01T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: false,
    ticketPrice: 35.00,
    comments: [
      { id: 'c8', eventId: '8', userId: '1', user: mockUsers[0], message: "Best concert ever! Duki killed it 🔥", createdAt: '2024-05-16T02:30:00Z' },
      { id: 'c8b', eventId: '8', userId: '2', user: mockUsers[1], message: "The crowd was absolutely wild! So glad we went.", createdAt: '2024-05-16T03:00:00Z' },
      { id: 'c8c', eventId: '8', userId: '4', user: mockUsers[3], message: "What a performance! Can't believe we were there.", createdAt: '2024-05-16T10:15:00Z' },
    ],
    photos: [
      {
        id: '8',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '1',
        uploadedAt: '2024-05-16T02:45:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['2', '3', '4']
      }
    ]
  },
  {
    id: '9',
    name: 'Padel Match - Friends Tournament',
    description: 'Friendly padel tournament at the local club. Great competition and lots of fun!',
    date: '2024-06-20',
    time: '6:00 PM',
    location: 'Club de Padel Barcelona, Sarrià',
    organizerId: '5',
    organizer: mockUsers[4],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-06-18T10:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'going', joinedAt: '2024-06-18T11:00:00Z' },
      { userId: '6', user: mockUsers[5], status: 'going', joinedAt: '2024-06-19T12:00:00Z' },
      { userId: '7', user: mockUsers[6], status: 'going', joinedAt: '2024-06-19T13:00:00Z' },
    ],
    createdAt: '2024-06-10T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    comments: [
      { id: 'c9', eventId: '9', userId: '5', user: mockUsers[4], message: "Great matches everyone! We need a rematch soon 😄", createdAt: '2024-06-20T20:00:00Z' },
      { id: 'c9b', eventId: '9', userId: '1', user: mockUsers[0], message: "Amazing tournament! So much fun.", createdAt: '2024-06-20T20:30:00Z' },
      { id: 'c9c', eventId: '9', userId: '6', user: mockUsers[5], message: "Thanks for organizing! Let's do it again. 🎾", createdAt: '2024-06-20T21:00:00Z' },
    ],
    photos: [
      {
        id: '9',
        url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '5',
        uploadedAt: '2024-06-20T20:15:00Z',
        reactions: [],
        comments: [],
        taggedUsers: ['1', '6', '7']
      }
    ]
  },
  {
    id: '10',
    name: 'Tapas Tour in El Born',
    description: 'Exploring the best tapas bars in El Born neighborhood. Amazing food and great company!',
    date: '2024-07-05',
    time: '8:00 PM',
    location: 'El Born, Barcelona',
    organizerId: '2',
    organizer: mockUsers[1],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-07-01T10:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-07-01T11:00:00Z' },
      { userId: '8', user: mockUsers[7], status: 'going', joinedAt: '2024-07-02T12:00:00Z' },
      { userId: '9', user: mockUsers[8], status: 'going', joinedAt: '2024-07-03T13:00:00Z' },
    ],
    createdAt: '2024-06-25T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    comments: [
      { id: 'c10', eventId: '10', userId: '2', user: mockUsers[1], message: "The patatas bravas at that first place were incredible!", createdAt: '2024-07-05T22:00:00Z' },
      { id: 'c10b', eventId: '10', userId: '1', user: mockUsers[0], message: "Best tapas tour ever! And the vermouth... 🍷", createdAt: '2024-07-05T22:30:00Z' },
      { id: 'c10c', eventId: '10', userId: '8', user: mockUsers[7], message: "We have to go back to that place with the cool artwork.", createdAt: '2024-07-06T10:00:00Z' },
    ],
    photos: [
      {
        id: '10',
        url: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '2',
        uploadedAt: '2024-07-05T21:00:00Z',
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
