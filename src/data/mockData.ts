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
    name: 'Beach BBQ Party',
    description: 'Join us for a fun beach BBQ with great food, music, and sunset views! Bring your friends and appetite.',
    date: '2025-07-15',
    time: '6:00 PM',
    location: 'Barceloneta Beach',
    organizerId: '1',
    organizer: mockUsers[0],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-01T10:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-01-02T10:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'maybe', joinedAt: '2024-01-03T10:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'not-going', joinedAt: '2024-01-04T10:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'going', joinedAt: '2024-01-05T10:00:00Z' },
      { userId: '6', user: mockUsers[5], status: 'going', joinedAt: '2024-01-06T10:00:00Z' },
      { userId: '7', user: mockUsers[6], status: 'maybe', joinedAt: '2024-01-07T10:00:00Z' },
      { userId: '8', user: mockUsers[7], status: 'going', joinedAt: '2024-01-08T10:00:00Z' },
      { userId: '9', user: mockUsers[8], status: 'going', joinedAt: '2024-01-09T10:00:00Z' },
      { userId: '10', user: mockUsers[9], status: 'maybe', joinedAt: '2024-01-10T10:00:00Z' },
      { userId: '11', user: mockUsers[10], status: 'going', joinedAt: '2024-01-11T10:00:00Z' },
      { userId: '12', user: mockUsers[11], status: 'going', joinedAt: '2024-01-12T10:00:00Z' },
      { userId: '13', user: mockUsers[12], status: 'going', joinedAt: '2024-01-13T10:00:00Z' },
      { userId: '14', user: mockUsers[13], status: 'maybe', joinedAt: '2024-01-14T10:00:00Z' },
      { userId: '15', user: mockUsers[14], status: 'going', joinedAt: '2024-01-15T10:00:00Z' },
      { userId: '16', user: mockUsers[15], status: 'going', joinedAt: '2024-01-16T10:00:00Z' },
      { userId: '17', user: mockUsers[16], status: 'going', joinedAt: '2024-01-17T10:00:00Z' },
      { userId: '18', user: mockUsers[17], status: 'maybe', joinedAt: '2024-01-18T10:00:00Z' },
      { userId: '19', user: mockUsers[18], status: 'going', joinedAt: '2024-01-19T10:00:00Z' },
      { userId: '20', user: mockUsers[19], status: 'going', joinedAt: '2024-01-20T10:00:00Z' },
    ],
    createdAt: '2024-01-01T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    photos: [
      {
        id: 'photo-1-1',
        url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '1',
        uploadedAt: '2024-01-02T10:00:00Z',
        reactions: [
          { id: 'r1', userId: '2', emoji: '❤️', createdAt: '2024-01-02T10:30:00Z' },
          { id: 'r2', userId: '5', emoji: '🔥', createdAt: '2024-01-02T10:35:00Z' }
        ],
        comments: [
          { id: 'c1', userId: '2', user: mockUsers[1], message: 'Amazing food!', createdAt: '2024-01-02T10:30:00Z' }
        ],
        taggedUsers: ['1', '2']
      },
      {
        id: 'photo-1-2',
        url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '2',
        uploadedAt: '2024-01-02T11:00:00Z',
        reactions: [
          { id: 'r3', userId: '1', emoji: '😍', createdAt: '2024-01-02T11:05:00Z' },
          { id: 'r4', userId: '6', emoji: '👏', createdAt: '2024-01-02T11:10:00Z' }
        ],
        comments: [],
        taggedUsers: ['2', '5']
      },
      {
        id: 'photo-1-3',
        url: 'https://images.unsplash.com/photo-1504674900240-9a9049b7d8ce?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '5',
        uploadedAt: '2024-01-02T12:00:00Z',
        reactions: [
          { id: 'r5', userId: '1', emoji: '🔥', createdAt: '2024-01-02T12:10:00Z' },
          { id: 'r6', userId: '2', emoji: '❤️', createdAt: '2024-01-02T12:15:00Z' }
        ],
        comments: [
          { id: 'c2', userId: '1', user: mockUsers[0], message: 'Perfect sunset!', createdAt: '2024-01-02T12:15:00Z' }
        ],
        taggedUsers: ['5', '6']
      },
      {
        id: 'photo-1-4',
        url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '6',
        uploadedAt: '2024-01-02T13:00:00Z',
        reactions: [
          { id: 'r7', userId: '1', emoji: '🤩', createdAt: '2024-01-02T13:05:00Z' }
        ],
        comments: [],
        taggedUsers: ['1', '2', '5', '6']
      }
    ]
  },
  {
    id: '2',
    name: 'Primavera Sound Festival',
    description: 'The ultimate music festival experience in Barcelona! Three days of incredible artists, food, and unforgettable memories.',
    date: '2025-06-01',
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
      { userId: '6', user: mockUsers[5], status: 'going', joinedAt: '2024-01-20T10:00:00Z', hasPurchasedTicket: true },
      { userId: '7', user: mockUsers[6], status: 'going', joinedAt: '2024-01-21T10:00:00Z', hasPurchasedTicket: false },
      { userId: '8', user: mockUsers[7], status: 'maybe', joinedAt: '2024-01-22T10:00:00Z', hasPurchasedTicket: false },
      { userId: '9', user: mockUsers[8], status: 'going', joinedAt: '2024-01-23T10:00:00Z', hasPurchasedTicket: true },
      { userId: '10', user: mockUsers[9], status: 'going', joinedAt: '2024-01-24T10:00:00Z', hasPurchasedTicket: false },
      { userId: '11', user: mockUsers[10], status: 'going', joinedAt: '2024-01-25T10:00:00Z', hasPurchasedTicket: true },
      { userId: '12', user: mockUsers[11], status: 'maybe', joinedAt: '2024-01-26T10:00:00Z', hasPurchasedTicket: false },
      { userId: '13', user: mockUsers[12], status: 'going', joinedAt: '2024-01-27T10:00:00Z', hasPurchasedTicket: true },
      { userId: '14', user: mockUsers[13], status: 'going', joinedAt: '2024-01-28T10:00:00Z', hasPurchasedTicket: false },
      { userId: '15', user: mockUsers[14], status: 'going', joinedAt: '2024-01-29T10:00:00Z', hasPurchasedTicket: true },
      { userId: '16', user: mockUsers[15], status: 'maybe', joinedAt: '2024-01-30T10:00:00Z', hasPurchasedTicket: false },
      { userId: '17', user: mockUsers[16], status: 'going', joinedAt: '2024-01-31T10:00:00Z', hasPurchasedTicket: true },
      { userId: '18', user: mockUsers[17], status: 'going', joinedAt: '2024-02-01T10:00:00Z', hasPurchasedTicket: false },
      { userId: '19', user: mockUsers[18], status: 'going', joinedAt: '2024-02-02T10:00:00Z', hasPurchasedTicket: true },
      { userId: '20', user: mockUsers[19], status: 'maybe', joinedAt: '2024-02-03T10:00:00Z', hasPurchasedTicket: false },
      { userId: '21', user: mockUsers[20], status: 'going', joinedAt: '2024-02-04T10:00:00Z', hasPurchasedTicket: true },
      { userId: '22', user: mockUsers[21], status: 'going', joinedAt: '2024-02-05T10:00:00Z', hasPurchasedTicket: false },
      { userId: '23', user: mockUsers[22], status: 'going', joinedAt: '2024-02-06T10:00:00Z', hasPurchasedTicket: true },
      { userId: '24', user: mockUsers[23], status: 'maybe', joinedAt: '2024-02-07T10:00:00Z', hasPurchasedTicket: false },
      { userId: '25', user: mockUsers[24], status: 'going', joinedAt: '2024-02-08T10:00:00Z', hasPurchasedTicket: true },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: false,
    ticketUrl: 'https://primaverasound.com/tickets',
    ticketPrice: 280,
    photos: [
      {
        id: 'photo-2-1',
        url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '2',
        uploadedAt: '2024-01-16T10:00:00Z',
        reactions: [
          { id: 'r8', userId: '1', emoji: '🎵', createdAt: '2024-01-16T10:30:00Z' },
          { id: 'r9', userId: '6', emoji: '🔥', createdAt: '2024-01-16T10:35:00Z' }
        ],
        comments: [
          { id: 'c3', userId: '1', user: mockUsers[0], message: 'Incredible atmosphere!', createdAt: '2024-01-16T10:40:00Z' }
        ],
        taggedUsers: ['2', '6']
      },
      {
        id: 'photo-2-2',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '1',
        uploadedAt: '2024-01-16T11:00:00Z',
        reactions: [
          { id: 'r10', userId: '2', emoji: '❤️', createdAt: '2024-01-16T11:05:00Z' },
          { id: 'r11', userId: '9', emoji: '🤩', createdAt: '2024-01-16T11:10:00Z' }
        ],
        comments: [],
        taggedUsers: ['1', '9']
      },
      {
        id: 'photo-2-3',
        url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '6',
        uploadedAt: '2024-01-16T12:00:00Z',
        reactions: [
          { id: 'r12', userId: '1', emoji: '🎉', createdAt: '2024-01-16T12:05:00Z' },
          { id: 'r13', userId: '2', emoji: '🔥', createdAt: '2024-01-16T12:10:00Z' }
        ],
        comments: [
          { id: 'c4', userId: '2', user: mockUsers[1], message: 'Best festival ever!', createdAt: '2024-01-16T12:15:00Z' }
        ],
        taggedUsers: ['6', '11', '13']
      },
      {
        id: 'photo-2-4',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '9',
        uploadedAt: '2024-01-16T13:00:00Z',
        reactions: [
          { id: 'r14', userId: '1', emoji: '👏', createdAt: '2024-01-16T13:05:00Z' }
        ],
        comments: [],
        taggedUsers: ['9', '15', '17']
      }
    ]
  },
  {
    id: '3',
    name: 'Game Night',
    description: 'Board games, card games, and lots of fun! Perfect for a cozy evening with friends.',
    date: '2025-01-10',
    time: '7:00 PM',
    location: 'Gracia',
    organizerId: '3',
    organizer: mockUsers[2],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-01-05T10:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-01-05T10:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-01-06T10:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'maybe', joinedAt: '2024-01-07T10:00:00Z' },
      { userId: '6', user: mockUsers[5], status: 'going', joinedAt: '2024-01-08T10:00:00Z' },
      { userId: '7', user: mockUsers[6], status: 'going', joinedAt: '2024-01-09T10:00:00Z' },
      { userId: '8', user: mockUsers[7], status: 'maybe', joinedAt: '2024-01-10T10:00:00Z' },
    ],
    createdAt: '2024-01-05T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: false,
    photos: [
      {
        id: 'photo-3-1',
        url: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '3',
        uploadedAt: '2024-01-06T10:00:00Z',
        reactions: [
          { id: 'r15', userId: '1', emoji: '🎲', createdAt: '2024-01-06T10:30:00Z' },
          { id: 'r16', userId: '4', emoji: '😄', createdAt: '2024-01-06T10:35:00Z' }
        ],
        comments: [
          { id: 'c5', userId: '1', user: mockUsers[0], message: 'Great game night!', createdAt: '2024-01-06T10:40:00Z' }
        ],
        taggedUsers: ['3', '1', '4']
      },
      {
        id: 'photo-3-2',
        url: 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '1',
        uploadedAt: '2024-01-06T11:00:00Z',
        reactions: [
          { id: 'r17', userId: '3', emoji: '🃏', createdAt: '2024-01-06T11:05:00Z' },
          { id: 'r18', userId: '6', emoji: '🎯', createdAt: '2024-01-06T11:10:00Z' }
        ],
        comments: [],
        taggedUsers: ['1', '6', '7']
      }
    ]
  },
  {
    id: '4',
    name: 'Tapas Tour',
    description: 'Explore the best tapas bars in the Gothic Quarter. Sample delicious bites and local wines.',
    date: '2025-08-20',
    time: '7:30 PM',
    location: 'Gothic Quarter',
    organizerId: '1',
    organizer: mockUsers[0],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: '2024-02-01T10:00:00Z' },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-02-02T10:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'maybe', joinedAt: '2024-02-03T10:00:00Z' },
      { userId: '6', user: mockUsers[5], status: 'going', joinedAt: '2024-02-04T10:00:00Z' },
      { userId: '7', user: mockUsers[6], status: 'going', joinedAt: '2024-02-05T10:00:00Z' },
      { userId: '8', user: mockUsers[7], status: 'maybe', joinedAt: '2024-02-06T10:00:00Z' },
      { userId: '9', user: mockUsers[8], status: 'going', joinedAt: '2024-02-07T10:00:00Z' },
      { userId: '10', user: mockUsers[9], status: 'going', joinedAt: '2024-02-08T10:00:00Z' },
      { userId: '11', user: mockUsers[10], status: 'going', joinedAt: '2024-02-09T10:00:00Z' },
      { userId: '12', user: mockUsers[11], status: 'maybe', joinedAt: '2024-02-10T10:00:00Z' },
      { userId: '13', user: mockUsers[12], status: 'going', joinedAt: '2024-02-11T10:00:00Z' },
      { userId: '14', user: mockUsers[13], status: 'going', joinedAt: '2024-02-12T10:00:00Z' },
      { userId: '15', user: mockUsers[14], status: 'going', joinedAt: '2024-02-13T10:00:00Z' },
      { userId: '16', user: mockUsers[15], status: 'maybe', joinedAt: '2024-02-14T10:00:00Z' },
      { userId: '17', user: mockUsers[16], status: 'going', joinedAt: '2024-02-15T10:00:00Z' },
      { userId: '18', user: mockUsers[17], status: 'going', joinedAt: '2024-02-16T10:00:00Z' },
      { userId: '19', user: mockUsers[18], status: 'going', joinedAt: '2024-02-17T10:00:00Z' },
      { userId: '20', user: mockUsers[19], status: 'maybe', joinedAt: '2024-02-18T10:00:00Z' },
      { userId: '21', user: mockUsers[20], status: 'going', joinedAt: '2024-02-19T10:00:00Z' },
      { userId: '22', user: mockUsers[21], status: 'going', joinedAt: '2024-02-20T10:00:00Z' },
      { userId: '23', user: mockUsers[22], status: 'going', joinedAt: '2024-02-21T10:00:00Z' },
      { userId: '24', user: mockUsers[23], status: 'maybe', joinedAt: '2024-02-22T10:00:00Z' },
    ],
    createdAt: '2024-02-01T10:00:00Z',
    hasExpenseSplitting: true,
    isPublic: true,
    isPromoted: true,
    discountPercentage: 15,
    photos: [
      {
        id: 'photo-4-1',
        url: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '1',
        uploadedAt: '2024-02-02T10:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: []
      },
      {
        id: 'photo-4-2',
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '2',
        uploadedAt: '2024-02-02T11:00:00Z',
        reactions: [],
        comments: [],
        taggedUsers: []
      }
    ]
  },
  {
    id: '5',
    name: 'Salsa Night',
    description: 'Dance the night away at a lively salsa club in El Born. Beginners welcome!',
    date: '2025-09-05',
    time: '10:00 PM',
    location: 'El Born',
    organizerId: '2',
    organizer: mockUsers[1],
    attendees: [
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: '2024-02-15T10:00:00Z' },
      { userId: '3', user: mockUsers[2], status: 'maybe', joinedAt: '2024-02-16T10:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-02-17T10:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'going', joinedAt: '2024-02-18T10:00:00Z' },
      { userId: '6', user: mockUsers[5], status: 'going', joinedAt: '2024-02-19T10:00:00Z' },
      { userId: '7', user: mockUsers[6], status: 'maybe', joinedAt: '2024-02-20T10:00:00Z' },
      { userId: '8', user: mockUsers[7], status: 'going', joinedAt: '2024-02-21T10:00:00Z' },
      { userId: '9',  user: mockUsers[8], status: 'going', joinedAt: '2024-02-22T10:00:00Z' },
      { userId: '10', user: mockUsers[9], status: 'going', joinedAt: '2024-02-23T10:00:00Z' },
      { userId: '11', user: mockUsers[10], status: 'maybe', joinedAt: '2024-02-24T10:00:00Z' },
      { userId: '12', user: mockUsers[11], status: 'going', joinedAt: '2024-02-25T10:00:00Z' },
      { userId: '13', user: mockUsers[12], status: 'going', joinedAt: '2024-02-26T10:00:00Z' },
      { userId: '14', user: mockUsers[13], status: 'going', joinedAt: '2024-02-27T10:00:00Z' },
      { userId: '15', user: mockUsers[14], status: 'maybe', joinedAt: '2024-02-28T10:00:00Z' },
      { userId: '16', user: mockUsers[15], status: 'going', joinedAt: '2024-03-01T10:00:00Z' },
      { userId: '17', user: mockUsers[16], status: 'going', joinedAt: '2024-03-02T10:00:00Z' },
      { userId: '18', user: mockUsers[17], status: 'going', joinedAt: '2024-03-03T10:00:00Z' },
      { userId: '19', user: mockUsers[18], status: 'maybe', joinedAt: '2024-03-04T10:00:00Z' },
      { userId: '20', user: mockUsers[19], status: 'going', joinedAt: '2024-03-05T10:00:00Z' },
      { userId: '21', user: mockUsers[20], status: 'going', joinedAt: '2024-03-06T10:00:00Z' },
      { userId: '22', user: mockUsers[21], status: 'going', joinedAt: '2024-03-07T10:00:00Z' },
      { userId: '23', user: mockUsers[22], status: 'maybe', joinedAt: '2024-03-08T10:00:00Z' },
    ],
    createdAt: '2024-02-15T10:00:00Z',
    hasExpenseSplitting: false,
    isPublic: true,
    isPromoted: true,
    discountPercentage: 20,
  },
  {
    id: '6',
    name: 'Sunset Yoga',
    description: 'Relax and rejuvenate with a sunset yoga session on the beach. All levels welcome.',
    date: '2025-07-22',
    time: '7:00 PM',
    location: 'Bogatell Beach',
    organizerId: '3',
    organizer: mockUsers[2],
    attendees: [
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: '2024-03-01T10:00:00Z' },
      { userId: '4', user: mockUsers[3], status: 'going', joinedAt: '2024-03-02T10:00:00Z' },
      { userId: '5', user: mockUsers[4], status: 'going', joinedAt: '2024-03-03T10:00:00Z' },
      { userId: '6', user: mockUsers[5], status: 'maybe', joinedAt: '2024-03-04T10:00:00Z' },
      { userId: '7', user: mockUsers[6], status: 'going', joinedAt: '2024-03-05T10:00:00Z' },
      { userId: '8', user: mockUsers[7], status: 'going', joinedAt: '2024-03-06T10:00:00Z' },
      { userId: '9', user: mockUsers[8], status: 'going', joinedAt: '2024-03-07T10:00:00Z' },
      { userId: '10', user: mockUsers[9], status: 'maybe', joinedAt: '2024-03-08T10:00:00Z' },
      { userId: '11', user: mockUsers[10], status: 'going', joinedAt: '2024-03-09T10:00:00Z' },
      { userId: '12', user: mockUsers[11], status: 'going', joinedAt: '2024-03-10T10:00:00Z' },
      { userId: '13', user: mockUsers[12], status: 'going', joinedAt: '2024-03-11T10:00:00Z' },
      { userId: '14', user: mockUsers[13], status: 'maybe', joinedAt: '2024-03-12T10:00:00Z' },
      { userId: '15', user: mockUsers[14], status: 'going', joinedAt: '2024-03-13T10:00:00Z' },
      { userId: '16', user: mockUsers[15], status: 'going', joinedAt: '2024-03-14T10:00:00Z' },
      { userId: '17', user: mockUsers[16], status: 'going', joinedAt: '2024-03-15T10:00:00Z' },
      { userId: '18', user: mockUsers[17], status: 'maybe', joinedAt: '2024-03-16T10:00:00Z' },
      { userId: '19', user: mockUsers[18], status: 'going', joinedAt: '2024-03-17T10:00:00Z' },
      { userId: '20', user: mockUsers[19], status: 'going', joinedAt: '2024-03-18T10:00:00Z' },
      { userId: '21', user: mockUsers[20], status: 'going', joinedAt: '2024-03-19T10:00:00Z' },
      { userId: '22', user: mockUsers[21], status: 'maybe', joinedAt: '2024-03-20T10:00:00Z' },
      { userId: '23', user: mockUsers[22], status: 'going', joinedAt: '2024-03-21T10:00:00Z' },
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
    message: 'Can\'t wait for this! The beach BBQ sounds amazing!',
    createdAt: '2024-01-03T10:00:00Z',
  },
  {
    id: '2',
    eventId: '1',
    userId: '3',
    user: mockUsers[2],
    message: 'What should I bring? Any dietary restrictions to consider?',
    createdAt: '2024-01-03T11:00:00Z',
  },
  {
    id: '3',
    eventId: '1',
    userId: '5',
    user: mockUsers[4],
    message: 'I can bring some vegetarian options and drinks!',
    createdAt: '2024-01-03T12:00:00Z',
  },
  {
    id: '4',
    eventId: '1',
    userId: '6',
    user: mockUsers[5],
    message: 'Perfect timing for sunset! 🌅',
    createdAt: '2024-01-03T13:00:00Z',
  },
  {
    id: '5',
    eventId: '2',
    userId: '1',
    user: mockUsers[0],
    message: 'This lineup is incredible! Can\'t believe we got tickets!',
    createdAt: '2024-01-16T10:00:00Z',
  },
  {
    id: '6',
    eventId: '2',
    userId: '9',
    user: mockUsers[8],
    message: 'Who else is excited for the headliner? 🎵',
    createdAt: '2024-01-16T11:00:00Z',
  },
  {
    id: '7',
    eventId: '2',
    userId: '11',
    user: mockUsers[10],
    message: 'Let\'s meet up before the show starts!',
    createdAt: '2024-01-16T12:00:00Z',
  },
  {
    id: '8',
    eventId: '3',
    userId: '1',
    user: mockUsers[0],
    message: 'What games should we play? I\'ll bring Monopoly and Scrabble!',
    createdAt: '2024-01-06T10:00:00Z',
  },
  {
    id: '9',
    eventId: '3',
    userId: '4',
    user: mockUsers[3],
    message: 'I have Cards Against Humanity and Codenames!',
    createdAt: '2024-01-06T11:00:00Z',
  },
  {
    id: '10',
    eventId: '4',
    userId: '2',
    user: mockUsers[1],
    message: 'The Gothic Quarter has the best tapas bars! Great choice!',
    createdAt: '2024-02-02T10:00:00Z',
  },
  {
    id: '11',
    eventId: '4',
    userId: '7',
    user: mockUsers[6],
    message: 'I know a hidden gem with amazing patatas bravas!',
    createdAt: '2024-02-02T11:00:00Z',
  },
  {
    id: '12',
    eventId: '4',
    userId: '10',
    user: mockUsers[9],
    message: 'Should we make reservations or just walk in?',
    createdAt: '2024-02-02T12:00:00Z',
  },
  {
    id: '13',
    eventId: '5',
    userId: '4',
    user: mockUsers[3],
    message: 'I\'ve been practicing my salsa moves! Ready to dance! 💃',
    createdAt: '2024-02-16T10:00:00Z',
  },
  {
    id: '14',
    eventId: '5',
    userId: '8',
    user: mockUsers[7],
    message: 'El Born has such a great nightlife scene!',
    createdAt: '2024-02-16T11:00:00Z',
  },
  {
    id: '15',
    eventId: '6',
    userId: '5',
    user: mockUsers[4],
    message: 'Sunset yoga on the beach sounds so peaceful 🧘‍♀️',
    createdAt: '2024-03-02T10:00:00Z',
  },
  {
    id: '16',
    eventId: '6',
    userId: '7',
    user: mockUsers[6],
    message: 'Should I bring my own yoga mat or will they provide them?',
    createdAt: '2024-03-02T11:00:00Z',
  },
];
