import { User, Event, Expense, Comment, EventPhoto, Notification, Message } from '@/types';

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
      { id: 'c1', eventId: '1', userId: '2', user: mockUsers[1], message: "Let's go! Pachá is always a vibe. Ready for some good music.", createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c1b', eventId: '1', userId: '3', user: mockUsers[2], message: "So in! What's the dress code? Smart casual?", createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c1c', eventId: '1', userId: '1', user: mockUsers[0], message: "Yep, smart casual! No sportswear. Let's look sharp.", createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c1d', eventId: '1', userId: '4', user: mockUsers[3], message: "I'll be there around midnight. Save me a dance!", createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c1e', eventId: '1', userId: '5', user: mockUsers[4], message: "Who's on the decks? Hope it's a good DJ.", createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
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
      { id: 'c2', eventId: '2', userId: '4', user: mockUsers[3], message: "Sounds like a perfect afternoon. I'm in! 🏐", createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c2b', eventId: '2', userId: '5', user: mockUsers[4], message: "I'm a maybe, depends on work. But I'll try my best to join for the sunset!", createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c2c', eventId: '2', userId: '1', user: mockUsers[0], message: "Awesome! I'll bring a ball and a frisbee.", createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c2d', eventId: '2', userId: '6', user: mockUsers[5], message: "I'll bring a cooler with some beers and water.", createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c2e', eventId: '2', userId: '7', user: mockUsers[6], message: "Anyone up for a swim? The water should be nice.", createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() },
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
      { id: 'c3', eventId: '3', userId: '3', user: mockUsers[2], message: "Força Barça! This is a huge game. The atmosphere will be electric.", createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c3b', eventId: '3', userId: '1', user: mockUsers[0], message: "I'm so there! What time should we meet to get good seats?", createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c3c', eventId: '3', userId: '2', user: mockUsers[1], message: "Let's meet at 8:30 PM to be safe. I'll grab a table.", createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c3d', eventId: '3', userId: '4', user: mockUsers[3], message: "Tempted... I'll see if I can move my other plans.", createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c3e', eventId: '3', userId: '8', user: mockUsers[7], message: "Are they showing the game with Spanish commentary?", createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
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
      { id: 'c4', eventId: '4', userId: '5', user: mockUsers[4], message: "Yes! Sutton has a great vibe. It's been a while.", createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c4b', eventId: '4', userId: '1', user: mockUsers[0], message: "I'm a maybe for now, will confirm closer to the date.", createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c4c', eventId: '4', userId: '2', user: mockUsers[1], message: "How are we handling tickets? Buying at the door or pre-purchasing?", createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c4d', eventId: '4', userId: '4', user: mockUsers[3], message: "I think pre-purchasing is cheaper. I'll send a link.", createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c4e', eventId: '4', userId: '3', user: mockUsers[2], message: "I'm in, sounds like a plan!", createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
    ],
  },

  // --- PUBLIC EVENTS ---
  {
    id: '5',
    name: 'Primavera Sound Festival',
    description: 'The biggest music festival in Barcelona! Join us for an incredible lineup featuring international artists and local talent.',
    date: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0], // 2 months from now
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
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
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
        uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        reactions: [],
        comments: [],
        taggedUsers: ['2', '3']
      }
    ],
    comments: [
      { id: 'c5', eventId: '5', userId: '3', user: mockUsers[2], message: "The lineup is fire this year! Can't wait to see Lana Del Rey.", createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c5b', eventId: '5', userId: '4', user: mockUsers[3], message: "Just got my ticket! Who else is confirmed?", createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c5c', eventId: '5', userId: '1', user: mockUsers[0], message: "I'm going! We should make a meeting point for our group.", createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c5d', eventId: '5', userId: '6', user: mockUsers[5], message: "Pro tip: the food trucks near the main stage are the best.", createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c5e', eventId: '5', userId: '7', user: mockUsers[6], message: "Remember to bring sunscreen and a hat, it gets hot!", createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    totalAttendees: 220000
  },
  {
    id: '6',
    name: 'Sónar Festival',
    description: 'The world\'s most advanced music, creativity and technology festival. Experience cutting-edge electronic music and digital art.',
    date: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0], // 3 months from now
    time: '2:00 PM',
    location: 'Fira Barcelona',
    organizerId: '2',
    organizer: mockUsers[1],
    attendees: [
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '5', user: mockUsers[4], status: 'maybe', joinedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() }
    ],
    createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
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
        uploadedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        reactions: [],
        comments: [],
        taggedUsers: ['3']
      }
    ],
    comments: [
      { id: 'c6', eventId: '6', userId: '3', user: mockUsers[2], message: "Sónar by Night is where it's at. The visuals are going to be insane.", createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c6b', eventId: '6', userId: '5', user: mockUsers[4], message: "I'm more excited for Sónar+D, the tech talks are always mind-blowing.", createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c6c', eventId: '6', userId: '8', user: mockUsers[7], message: "Who's playing? The lineup determines everything for me.", createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c6d', eventId: '6', userId: '9', user: mockUsers[8], message: "It's Folamour and Kaytranada! It's a must-go.", createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c6e', eventId: '6', userId: '10', user: mockUsers[9], message: "Okay, I'm sold. Getting my ticket now.", createdAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    totalAttendees: 85000
  },
  {
    id: '7',
    name: 'Brunch in the Park',
    description: 'An open-air electronic music festival in the beautiful Jardins de Joan Brossa. Great music, food trucks, and a relaxed vibe.',
    date: new Date(new Date().setMonth(new Date().getMonth() + 4)).toISOString().split('T')[0], // 4 months from now
    time: '1:00 PM',
    location: 'Jardins de Joan Brossa, Montjuïc',
    organizerId: '10',
    organizer: mockUsers[9],
    attendees: [],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    hasExpenseSplitting: false,
    isPublic: true,
    isPromoted: true,
    ticketPrice: 45.00,
    discountPercentage: 10,
    ticketUrl: 'https://barcelona.brunch-in.com/',
    comments: [
      { id: 'c7', eventId: '7', userId: '6', user: mockUsers[5], message: "Brunch is the best Sunday plan! The vibe is always so chill.", createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c7b', eventId: '7', userId: '7', user: mockUsers[6], message: "Hope they have those amazing bao buns again.", createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c7c', eventId: '7', userId: '2', user: mockUsers[1], message: "Who's headlining this one?", createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c7d', eventId: '7', userId: '8', user: mockUsers[7], message: "It's Carl Cox! It's going to be packed.", createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c7e', eventId: '7', userId: '9', user: mockUsers[8], message: "No way! Okay, we have to go early to get a good spot.", createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    totalAttendees: 15000
  },

  // --- PAST EVENTS (RECENT) ---
  {
    id: '8',
    name: 'Duki Concert at Palau Sant Jordi',
    description: 'Incredible night with Duki at Palau Sant Jordi! The energy was absolutely insane.',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 month ago
    time: '9:00 PM',
    location: 'Palau Sant Jordi, Montjuïc',
    organizerId: '3',
    organizer: mockUsers[2],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), ticketStatus: 'purchased' },
      { userId: '3', user: mockUsers[2], status: 'going', joinedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), ticketStatus: 'purchased' },
      { userId: '6', user: mockUsers[5], status: 'going', joinedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), ticketStatus: 'purchased' }
    ],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    isPublic: true,
    isPast: true,
    hasExpenseSplitting: false,
    comments: [
      { id: 'c8', eventId: '8', userId: '1', user: mockUsers[0], message: "What a show! Duki killed it. The visuals were amazing.", createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c8b', eventId: '8', userId: '3', user: mockUsers[2], message: "Totally agree. 'Goteo' was insane live. So glad we went.", createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c8c', eventId: '8', userId: '6', user: mockUsers[5], message: "The energy from the crowd was unreal. Best concert of the year.", createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c8d', eventId: '8', userId: '9', user: mockUsers[8], message: "So sad I missed this! Hope he comes back soon.", createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c8e', eventId: '8', userId: '1', user: mockUsers[0], message: "We have to go together next time for sure.", createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
    ],
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=400&fit=crop&crop=center', uploadedBy: '1', taggedUsers: ['3', '6'], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&crop=center', uploadedBy: '3', taggedUsers: ['1'], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p3', url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=400&fit=crop&crop=center', uploadedBy: '6', taggedUsers: ['1', '3'], uploadedAt: new Date().toISOString(), reactions: [], comments: [] }
    ]
  },
  {
    id: '9',
    name: 'Calçotada in the Countryside',
    description: 'Traditional Catalan calçotada at a farmhouse outside the city. All you can eat calçots and grilled meat!',
    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 months ago
    time: '12:00 PM',
    location: 'Masia Can Portell, Vallès Oriental',
    organizerId: '5',
    organizer: mockUsers[4],
    attendees: [
      { userId: '1', user: mockUsers[0], status: 'going', joinedAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '2', user: mockUsers[1], status: 'going', joinedAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '5', user: mockUsers[4], status: 'going', joinedAt: new Date(Date.now() - 110 * 24 * 60 * 60 * 1000).toISOString() },
      { userId: '8', user: mockUsers[7], status: 'going', joinedAt: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000).toISOString() }
    ],
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    isPublic: false,
    isPast: true,
    hasExpenseSplitting: true,
    comments: [
      { id: 'c9', eventId: '9', userId: '1', user: mockUsers[0], message: "That was the best calçotada I've ever had! The romesco sauce was incredible.", createdAt: new Date(Date.now() - 89 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c9b', eventId: '9', userId: '2', user: mockUsers[1], message: "So. Much. Food. I'm still full. Great day trip!", createdAt: new Date(Date.now() - 89 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c9c', eventId: '9', userId: '5', user: mockUsers[4], message: "Glad everyone enjoyed it! We have to do it again next year.", createdAt: new Date(Date.now() - 88 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c9d', eventId: '9', userId: '8', user: mockUsers[7], message: "The grilled artichokes were a game changer.", createdAt: new Date(Date.now() - 88 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c9e', eventId: '9', userId: '1', user: mockUsers[0], message: "Definitely! Count me in for the next one.", createdAt: new Date(Date.now() - 87 * 24 * 60 * 60 * 1000).toISOString() },
    ]
  }
];

export const mockExpenses: Expense[] = [
  {
    id: 'exp1',
    eventId: '1', // Pachá VIP Night
    name: 'VIP Table & Bottles',
    amount: 600,
    paidBy: '1', // Javier García
    splitBetween: ['1', '2', '3'],
    payments: [
      { id: 'p1', expenseId: 'exp1', userId: '2', amount: 200, status: 'paid' },
      { id: 'p2', expenseId: 'exp1', userId: '3', amount: 200, status: 'pending' },
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'exp2',
    eventId: '3', // Barça Watch Party
    name: 'Bar Tab - First Round',
    amount: 80,
    paidBy: '2', // Maria Rodriguez
    splitBetween: ['1', '2', '3', '4'],
    payments: [
      { id: 'p3', expenseId: 'exp2', userId: '1', amount: 20, status: 'pending' },
      { id: 'p4', expenseId: 'exp2', userId: '3', amount: 20, status: 'paid' },
      { id: 'p5', expenseId: 'exp2', userId: '4', amount: 20, status: 'pending' },
    ],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'exp3',
    eventId: '4', // Sutton Club Night
    name: 'Pre-purchased Tickets',
    amount: 100,
    paidBy: '4', // Sofia Lopez
    splitBetween: ['1', '4', '5'],
    payments: [
      { id: 'p6', expenseId: 'exp3', userId: '1', amount: 33.33, status: 'pending' },
      { id: 'p7', expenseId: 'exp3', userId: '5', amount: 33.33, status: 'paid' },
    ],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export let mockComments: Comment[] = mockEvents.flatMap(event => event.comments || []);

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'event_invite',
    title: "You're invited to Pachá VIP Night!",
    message: "Javier García has invited you to their event.",
    userId: '4',
    relatedEventId: '1',
    relatedUserId: '1',
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'n2',
    type: 'payment_request',
    title: 'Payment Request',
    message: 'Maria Rodriguez requests €30 for the "Bar Tab" at the watch party.',
    userId: '1',
    relatedEventId: '3',
    relatedUserId: '2',
    isRead: false,
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'n3',
    type: 'reminder',
    title: 'Event Reminder',
    message: '"Beach Volleyball & Sunset" is happening tomorrow!',
    userId: '1',
    relatedEventId: '2',
    isRead: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'n4',
    type: 'message',
    title: 'New Message from Sofia Lopez',
    message: 'Hey, are you going to the Primavera Sound event?',
    userId: '1',
    relatedUserId: '4',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: '2',
    receiverId: '1',
    sender: mockUsers[1],
    type: 'text',
    content: 'Hey! Are you excited for the Pachá night?',
    isRead: false,
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'm2',
    senderId: '1',
    receiverId: '2',
    sender: mockCurrentUser,
    type: 'text',
    content: 'Absolutely! It\'s going to be epic. Have you got your ticket yet?',
    isRead: true,
    createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'm3',
    senderId: '4',
    receiverId: '1',
    sender: mockUsers[3],
    type: 'event_invite',
    content: 'I\'m organizing a night at Sutton, you should come!',
    eventId: '4',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'm4',
    senderId: '3',
    receiverId: '1',
    sender: mockUsers[2],
    type: 'payment_request',
    content: 'Hey, can you send me the €100 for the VIP table at Pachá?',
    eventId: '1',
    amount: 100,
    paymentMethods: ['Card', 'Bizum', 'PayPal'],
    isRead: true,
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'm5',
    senderId: '1',
    receiverId: '3',
    sender: mockCurrentUser,
    type: 'text',
    content: 'Just sent it! Let me know when you get it.',
    isRead: true,
    createdAt: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString()
  }
];
