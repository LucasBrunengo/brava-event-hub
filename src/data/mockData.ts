import { User, Event, Expense, Comment, EventPhoto, Notification, Message, Venue } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'Lucas Brunengo', email: 'lucas.brunengo@example.com', avatar: 'https://i.pinimg.com/474x/5f/ca/d2/5fcad25423c7b93be33f86ca91c9e4c0.jpg', phone: '+34666555444' },
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
  { id: '12', name: 'Raquel Navarro', email: 'raquel.navarro@example.com', avatar: 'https://i.pravatar.cc/150?img=12', phone: '+34666444333' },
  // --- Producers ---
  { id: 'prod1', name: 'Primavera Sound', email: 'info@primaverasound.com', avatar: 'https://www.primaverasound.com/themes/ps2022/assets/img/ps-logo.png', phone: '' },
  { id: 'prod2', name: 'Sónar Festival', email: 'info@sonarfestival.com', avatar: 'https://www.sonar.es/img/logo-sonar-2023.png', phone: '' },
  { id: 'prod3', name: 'Brunch in the Park', email: 'info@brunch-in.com', avatar: 'https://barcelona.brunch-in.com/img/logo.png', phone: '' },
];

export const mockCurrentUser: User = mockUsers[0]; // Lucas Brunengo is the current user

export const mockEvents: Event[] = [
  // --- PRIVATE EVENTS ORGANIZED BY CURRENT USER (Lucas) ---
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
    ticketUrl: '#',
    photos: [
      { id: 'p1-1', url: 'https://youbarcelona.com/uploads/images/c/pacha%20barcelona%20terraza%2012/400x300.webp?v=63787259999', uploadedBy: '1', taggedUsers: ['2'], uploadedAt: new Date().toISOString(), 
        reactions: [
          { id: 'r1', userId: '2', emoji: '🔥', createdAt: new Date().toISOString() },
          { id: 'r2', userId: '3', emoji: '🤩', createdAt: new Date().toISOString() },
        ], 
        comments: [
          { id: 'pc1', userId: '2', user: mockUsers[1], message: 'Amazing night!', createdAt: new Date().toISOString() },
        ] 
      },
      { id: 'p1-2', url: 'https://ultimatetravelexperience.com/wp-content/uploads/2022/11/2-7.jpg', uploadedBy: '2', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p1-3', url: 'https://www.terrazeo.com/wp-content/uploads/2018/07/Pacha-Barcelona.jpg', uploadedBy: '3', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] }
    ],
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
    photos: [
      { id: 'p2-1', url: 'https://bcnbeachvolleyacademy.com/wp-content/uploads/2022/07/club-volley-playa2023-B.jpg', uploadedBy: '1', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p2-2', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREXMh7bVDVF1MPHqGCLByDrjwvd0fEUT1SDQ&s', uploadedBy: '4', taggedUsers: [], uploadedAt: new Date().toISOString(), 
        reactions: [
          { id: 'r3', userId: '4', emoji: '🏐', createdAt: new Date().toISOString() },
          { id: 'r4', userId: '5', emoji: '❤️', createdAt: new Date().toISOString() },
        ], 
        comments: [] 
      }
    ],
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
    photos: [
      { id: 'p3-1', url: 'https://groundhopperguides.com/wp-content/uploads/2021/10/image_50443777-scaled-800x600.jpg', uploadedBy: '2', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p3-2', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS2O2QbGugiRtaXO_Jv8Pv9Pn4ZaYSGjcy2HYp7OY_TWq5AmP8qA7HgdTTlLDIMLxgBS4&usqp=CAU', uploadedBy: '3', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] }
    ],
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
    ticketUrl: '#',
    photos: [
      { id: 'p4-1', url: 'https://youbarcelona.com/uploads/images/c/sutton%20barcelona%20sala%201/400x300.webp?v=63787260783', uploadedBy: '4', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p4-2', url: 'https://lh3.googleusercontent.com/proxy/j6MkxRFHZc-oTBCL-kZzVobkFiPrSkedR-gIMdJC7DAb2Rdhh7mh_qZ1elvGb9CmZvCp7yt6pJaf22Mrysbo2QTyo9vkRDC3viLWzLoh_YJRQg', uploadedBy: '5', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p4-3', url: 'https://youbarcelona.com/uploads/images/c/sutton%20barcelona%20sala%202/400x300.webp?v=63787260784', uploadedBy: '1', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] }
    ],
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
    organizerId: 'prod1',
    organizer: mockUsers.find(u => u.id === 'prod1')!,
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
        id: 'p5-1',
        url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '1',
        uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        reactions: [],
        comments: [],
        taggedUsers: ['2', '3']
      },
      { id: 'p5-2', url: 'https://www.gl-events.com/sites/default/files/styles/hero_background_image/public/2022-11/PRIMAVERA-SOUND-1500-KLEINEMEDIA.jpg?itok=K82RLsME', uploadedBy: '2', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p5-3', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9PWrz0X--PWA6EIwotks3ISBwN-fBOe2QeA&s', uploadedBy: '3', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] }
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
    organizerId: 'prod2',
    organizer: mockUsers.find(u => u.id === 'prod2')!,
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
        id: 'p6-1',
        url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop&crop=center',
        uploadedBy: '2',
        uploadedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        reactions: [],
        comments: [],
        taggedUsers: ['3']
      },
      { id: 'p6-2', url: 'https://storage.googleapis.com/pro-cms-bucket/Copia_de_057_Sonar_Club_Publico_Ambiente_Adriatique_Nerea_Coll_20240614_6abcaee360/Copia_de_057_Sonar_Club_Publico_Ambiente_Adriatique_Nerea_Coll_20240614_6abcaee360.jpg', uploadedBy: '2', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p6-3', url: 'https://www.eseibusinessschool.com/wp-content/uploads/2023/06/sonar.jpg', uploadedBy: '3', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p6-4', url: 'https://www.shbarcelona.es/blog/es/wp-content/uploads/2022/05/sonar-festival-barcelona-2022-810x540.jpg', uploadedBy: '5', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] }
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
    organizerId: 'prod3',
    organizer: mockUsers.find(u => u.id === 'prod3')!,
    attendees: [],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    hasExpenseSplitting: false,
    isPublic: true,
    isPromoted: true,
    ticketPrice: 45.00,
    discountPercentage: 10,
    ticketUrl: 'https://barcelona.brunch-in.com/',
    photos: [
        { id: 'p7-1', url: 'https://www.aspasios.com/assets/themes/www.aspasios.com/img/media/1745419374_Brunch%20Electronik%20The%20Sunday%20electronic%20music%20event%20in%20Barcelona%20%281%29.tmedium.webp', uploadedBy: '10', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
        { id: 'p7-2', url: 'https://www.webarcelona.net/sites/default/files/events/brunch-electronic-barcelona.jpg', uploadedBy: '6', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
        { id: 'p7-3', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5gK_ycDBwIY18FoIIHdHiiHZmskMB7LD6mA&s', uploadedBy: '7', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] }
    ],
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
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=400&fit=crop&crop=center', uploadedBy: '1', taggedUsers: ['3', '6'], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&crop=center', uploadedBy: '3', taggedUsers: ['1'], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p3', url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=400&fit=crop&crop=center', uploadedBy: '6', taggedUsers: ['1', '3'], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p8-4', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz2q5k3RseDtItgoxqm0Lz77vDjtHSsE8v9A&s', uploadedBy: '1', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] },
      { id: 'p8-5', url: 'https://www.sala-apolo.com/uploads/media/default/0001/02/thumb_1025_default_card.jpeg', uploadedBy: '3', taggedUsers: [], uploadedAt: new Date().toISOString(), reactions: [], comments: [] }
    ],
    comments: [
      { id: 'c8', eventId: '8', userId: '1', user: mockUsers[0], message: "What a show! Duki killed it. The visuals were amazing.", createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c8b', eventId: '8', userId: '3', user: mockUsers[2], message: "Totally agree. 'Goteo' was insane live. So glad we went.", createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c8c', eventId: '8', userId: '6', user: mockUsers[5], message: "The energy from the crowd was unreal. Best concert of the year.", createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c8d', eventId: '8', userId: '9', user: mockUsers[8], message: "So sad I missed this! Hope he comes back soon.", createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'c8e', eventId: '8', userId: '1', user: mockUsers[0], message: "We have to go together next time for sure.", createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
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
    paidBy: '1', // Lucas Brunengo
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
    message: "Lucas Brunengo has invited you to their event.",
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

// --- Venues (Restaurants & Wellness) ---
export const mockVenues: Venue[] = [
  {
    id: 'v1',
    name: 'La Boqueria Tapas',
    category: 'restaurant',
    address: 'La Rambla, 91, Barcelona',
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
    cuisines: ['Tapas', 'Spanish', 'Seafood'],
    tags: ['reservations', 'family-friendly'],
    hasReservations: true,
    availability: [
      { date: new Date().toISOString().split('T')[0], times: ['18:00', '18:30', '19:00', '20:00'] },
      { date: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0], times: ['18:00', '19:30', '21:00'] }
    ],
    promoted: true,
    distanceKm: 0.8
  },
  {
    id: 'v2',
    name: 'Sushi Zen BCN',
    category: 'restaurant',
    address: 'Carrer de Mallorca, 200, Barcelona',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    cuisines: ['Sushi', 'Japanese'],
    tags: ['romantic', 'vegan-options'],
    hasReservations: true,
    availability: [
      { date: new Date().toISOString().split('T')[0], times: ['19:00', '19:30', '20:00', '21:00'] }
    ],
    promoted: false,
    distanceKm: 1.7
  },
  {
    id: 'v3',
    name: 'Zen Yoga Studio',
    category: 'wellness',
    address: 'Carrer de Girona, 80, Barcelona',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    tags: ['yoga', 'mindfulness'],
    hasReservations: true,
    availability: [
      { date: new Date().toISOString().split('T')[0], times: ['09:00', '11:00', '17:00'] },
      { date: new Date(Date.now() + 2*24*60*60*1000).toISOString().split('T')[0], times: ['10:00', '12:00', '18:00'] }
    ],
    promoted: true,
    distanceKm: 2.3
  },
  {
    id: 'v4',
    name: 'Eixample Gym Club',
    category: 'wellness',
    address: "Carrer d'Aragó, 150, Barcelona",
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
    tags: ['gym', 'sauna', 'functional'],
    hasReservations: true,
    availability: [
      { date: new Date().toISOString().split('T')[0], times: ['08:00', '13:00', '19:00'] }
    ],
    promoted: false,
    distanceKm: 1.2
  },
  // Additional restaurants
  { id: 'v5', name: 'Trattoria Roma', category: 'restaurant', address: 'Passeig de Gràcia, 12', hasReservations: true, cuisines: ['Italian', 'Pasta'], tags: ['romantic'], availability: [], promoted: false, distanceKm: 2.1 },
  { id: 'v6', name: 'El Asador', category: 'restaurant', address: 'Carrer de Valencia, 45', hasReservations: true, cuisines: ['Steakhouse', 'Grill'], tags: ['reservations'], availability: [], promoted: true, distanceKm: 3.0 },
  { id: 'v7', name: 'Green Bowl', category: 'restaurant', address: 'Carrer de Pelai, 9', hasReservations: true, cuisines: ['Healthy', 'Vegan'], tags: ['vegan-options'], availability: [], promoted: false, distanceKm: 0.9 },
  { id: 'v8', name: 'La Paella House', category: 'restaurant', address: 'Ronda de Sant Pere, 3', hasReservations: true, cuisines: ['Spanish', 'Paella'], tags: [], availability: [], promoted: false, distanceKm: 2.7 },
  { id: 'v9', name: 'Bao Republic', category: 'restaurant', address: 'Carrer de Tallers, 22', hasReservations: true, cuisines: ['Asian', 'Street Food'], tags: [], availability: [], promoted: true, distanceKm: 1.5 },
  // Additional wellness
  { id: 'v10', name: 'DIR Functional Sagrada Família', category: 'wellness', address: 'Av. Gaudí, 30', hasReservations: true, tags: ['functional', 'classes'], availability: [], promoted: true, distanceKm: 2.9 },
  { id: 'v11', name: 'Hot Yoga BCN', category: 'wellness', address: 'Carrer de Casp, 88', hasReservations: true, tags: ['yoga', 'hot-yoga'], availability: [], promoted: false, distanceKm: 1.1 },
  { id: 'v12', name: 'Urban Spa Retreat', category: 'wellness', address: 'Passeig de Sant Joan, 40', hasReservations: true, tags: ['spa', 'sauna'], availability: [], promoted: false, distanceKm: 3.4 },
  // Bars/Karaoke/Clubs (entertainment)
  { id: 'v13', name: 'Barkadia', category: 'entertainment', address: 'Born, 12', hasReservations: false, tags: ['bar'], availability: [], promoted: true, distanceKm: 1.8 },
  { id: 'v14', name: 'Sing It Karaoke', category: 'entertainment', address: 'Eixample, 77', hasReservations: true, tags: ['karaoke'], availability: [], promoted: false, distanceKm: 2.2 },
  { id: 'v15', name: 'Club Aurora', category: 'entertainment', address: 'Port Olímpic', hasReservations: false, tags: ['club'], availability: [], promoted: true, distanceKm: 3.9 },
  { id: 'v16', name: 'Taproom BCN', category: 'entertainment', address: 'Gràcia, 15', hasReservations: false, tags: ['bar'], availability: [], promoted: false, distanceKm: 2.6 },
  { id: 'v17', name: 'K-Town Karaoke', category: 'entertainment', address: 'Les Corts, 20', hasReservations: true, tags: ['karaoke'], availability: [], promoted: false, distanceKm: 4.1 },
  { id: 'v18', name: 'Velvet Night', category: 'entertainment', address: 'Diagonal, 300', hasReservations: false, tags: ['club'], availability: [], promoted: true, distanceKm: 2.0 },
  { id: 'v19', name: 'Gastro Bar 58', category: 'entertainment', address: 'Poble Sec, 58', hasReservations: true, tags: ['bar'], availability: [], promoted: false, distanceKm: 1.3 },
  { id: 'v20', name: "Chef's Table BCN", category: 'restaurant', address: 'El Raval, 5', hasReservations: true, cuisines: ['Fine Dining'], tags: [], availability: [], promoted: true, distanceKm: 2.8 },

  // Bulk additions for restaurants
{ id: 'vr21', name: 'Pizza Napo BCN', category: 'restaurant', address: 'Gràcia 101', hasReservations: true, cuisines: ['Italian','Pizza'], tags: ['family'], availability: [], promoted: false, distanceKm: 2.2, imageUrl:'https://images.unsplash.com/photo-1548366086-7e4b24f95f3b?w=400&h=300&fit=crop' },
{ id: 'vr22', name: 'Ramen House', category: 'restaurant', address: 'Eixample 55', hasReservations: true, cuisines: ['Asian','Japanese'], tags: [], availability: [], promoted: true, distanceKm: 1.9, imageUrl:'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop' },
{ id: 'vr23', name: 'Curry Corner', category: 'restaurant', address: 'Born 23', hasReservations: true, cuisines: ['Indian'], tags: [], availability: [], promoted: false, distanceKm: 3.6, imageUrl:'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop' },
{ id: 'vr24', name: 'Taco Loco', category: 'restaurant', address: 'Raval 8', hasReservations: true, cuisines: ['Mexican'], tags: [], availability: [], promoted: false, distanceKm: 2.4, imageUrl:'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400&h=300&fit=crop' },
{ id: 'vr25', name: 'Pho Saigon', category: 'restaurant', address: 'Sants 12', hasReservations: true, cuisines: ['Vietnamese'], tags: [], availability: [], promoted: false, distanceKm: 4.4, imageUrl:'https://images.unsplash.com/photo-1512058564366-ed23c7cb9779?w=400&h=300&fit=crop' },
{ id: 'vr26', name: 'Burger Lab', category: 'restaurant', address: 'Diagonal 233', hasReservations: true, cuisines: ['Burgers'], tags: [], availability: [], promoted: true, distanceKm: 2.0, imageUrl:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop' },
{ id: 'vr27', name: 'Kebab Istanbul', category: 'restaurant', address: 'Clot 3', hasReservations: true, cuisines: ['Middle Eastern'], tags: [], availability: [], promoted: false, distanceKm: 3.1, imageUrl:'https://images.unsplash.com/photo-1604908554049-01b6e3b3b395?w=400&h=300&fit=crop' },
{ id: 'vr28', name: 'Sushi Go', category: 'restaurant', address: 'Poblenou 90', hasReservations: true, cuisines: ['Japanese','Sushi'], tags: [], availability: [], promoted: true, distanceKm: 2.7, imageUrl:'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop' },
{ id: 'vr29', name: 'Seafood Market', category: 'restaurant', address: 'Barceloneta 2', hasReservations: true, cuisines: ['Seafood'], tags: [], availability: [], promoted: true, distanceKm: 1.3, imageUrl:'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop' },
{ id: 'vr30', name: 'Wok Express', category: 'restaurant', address: 'Les Corts 78', hasReservations: true, cuisines: ['Chinese'], tags: [], availability: [], promoted: false, distanceKm: 4.0, imageUrl:'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop' },
{ id: 'vr31', name: 'Tapas & Wine', category: 'restaurant', address: 'Eixample 333', hasReservations: true, cuisines: ['Tapas','Spanish'], tags: [], availability: [], promoted: false, distanceKm: 0.7, imageUrl:'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400&h=300&fit=crop' },
{ id: 'vr32', name: 'BBQ Smokehouse', category: 'restaurant', address: 'Poble Sec 45', hasReservations: true, cuisines: ['BBQ'], tags: [], availability: [], promoted: false, distanceKm: 3.8, imageUrl:'https://images.unsplash.com/photo-1562967916-eb82221dfb36?w=400&h=300&fit=crop' },
{ id: 'vr33', name: 'Brunch & Co', category: 'restaurant', address: 'Gràcia 77', hasReservations: true, cuisines: ['Brunch'], tags: [], availability: [], promoted: true, distanceKm: 2.5, imageUrl:'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop' },
{ id: 'vr34', name: 'Noodle Bar', category: 'restaurant', address: 'Born 66', hasReservations: true, cuisines: ['Asian'], tags: [], availability: [], promoted: false, distanceKm: 2.9, imageUrl:'https://images.unsplash.com/photo-1512058564366-ed23c7cb9779?w=400&h=300&fit=crop' },
{ id: 'vr35', name: 'Gourmet Garden', category: 'restaurant', address: 'Sarrià 10', hasReservations: true, cuisines: ['Fine Dining'], tags: [], availability: [], promoted: true, distanceKm: 5.0, imageUrl:'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop' },
// Bulk additions for wellness
{ id: 'vw21', name: 'DIR Clot', category: 'wellness', address: 'Clot 11', hasReservations: true, tags: ['gym','functional'], availability: [], promoted: true, distanceKm: 3.2, imageUrl:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop' },
{ id: 'vw22', name: 'Metropolitan Sants', category: 'wellness', address: 'Sants 120', hasReservations: true, tags: ['gym','spa'], availability: [], promoted: true, distanceKm: 4.2, imageUrl:'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400&h=300&fit=crop' },
{ id: 'vw23', name: 'Yoga Vida', category: 'wellness', address: 'Eixample 210', hasReservations: true, tags: ['yoga'], availability: [], promoted: false, distanceKm: 1.0, imageUrl:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop' },
{ id: 'vw24', name: 'Barre Studio BCN', category: 'wellness', address: 'Gràcia 50', hasReservations: true, tags: ['barre'], availability: [], promoted: false, distanceKm: 2.0, imageUrl:'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=400&h=300&fit=crop' },
{ id: 'vw25', name: 'Spa Oasis', category: 'wellness', address: 'Diagonal 400', hasReservations: true, tags: ['spa','sauna'], availability: [], promoted: false, distanceKm: 2.6, imageUrl:'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400&h=300&fit=crop' },
{ id: 'vw26', name: 'Pilates Core', category: 'wellness', address: 'Born 8', hasReservations: true, tags: ['pilates'], availability: [], promoted: false, distanceKm: 2.1, imageUrl:'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=400&h=300&fit=crop' },
{ id: 'vw27', name: 'CrossFit Poblenou', category: 'wellness', address: 'Poblenou 33', hasReservations: true, tags: ['functional'], availability: [], promoted: true, distanceKm: 3.0, imageUrl:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop' },
{ id: 'vw28', name: 'Spin Factory', category: 'wellness', address: 'Eixample 15', hasReservations: true, tags: ['spin'], availability: [], promoted: false, distanceKm: 1.4, imageUrl:'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=400&h=300&fit=crop' },
{ id: 'vw29', name: 'Zen Meditation', category: 'wellness', address: 'Gòtic 3', hasReservations: true, tags: ['mindfulness'], availability: [], promoted: false, distanceKm: 0.9, imageUrl:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop' },
{ id: 'vw30', name: 'Hot Yoga Studio', category: 'wellness', address: 'Raval 13', hasReservations: true, tags: ['hot-yoga','yoga'], availability: [], promoted: true, distanceKm: 1.7, imageUrl:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop' },
{ id: 'vw31', name: 'Metropolitan Iradier', category: 'wellness', address: 'Sarrià 40', hasReservations: true, tags: ['gym','spa'], availability: [], promoted: true, distanceKm: 5.2, imageUrl:'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400&h=300&fit=crop' },
{ id: 'vw32', name: 'DIR Tuset', category: 'wellness', address: 'Tuset 14', hasReservations: true, tags: ['gym'], availability: [], promoted: false, distanceKm: 2.3, imageUrl:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop' },
{ id: 'vw33', name: 'Aqua Fitness', category: 'wellness', address: 'Barceloneta 10', hasReservations: true, tags: ['swim','functional'], availability: [], promoted: false, distanceKm: 1.2, imageUrl:'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400&h=300&fit=crop' },
{ id: 'vw34', name: 'Pilates Loft', category: 'wellness', address: 'Eixample 77', hasReservations: true, tags: ['pilates'], availability: [], promoted: false, distanceKm: 1.9, imageUrl:'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=400&h=300&fit=crop' },
{ id: 'vw35', name: 'Wellness Hub', category: 'wellness', address: 'Diagonal 99', hasReservations: true, tags: ['gym','yoga','barre'], availability: [], promoted: true, distanceKm: 3.3, imageUrl:'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400&h=300&fit=crop' },
// Bulk additions for entertainment
{ id: 've21', name: 'Bar Central', category: 'entertainment', address: 'Eixample 12', hasReservations: false, tags: ['bars'], availability: [], promoted: false, distanceKm: 1.1, imageUrl:'https://images.unsplash.com/photo-1514362545857-3bc16c4c76f0?w=400&h=300&fit=crop' },
{ id: 've22', name: 'Karaoke Star', category: 'entertainment', address: 'Gràcia 44', hasReservations: true, tags: ['karaoke'], availability: [], promoted: true, distanceKm: 2.2, imageUrl:'https://images.unsplash.com/photo-1571907480495-4f2f24c9d3a9?w=400&h=300&fit=crop' },
{ id: 've23', name: 'Club Noir', category: 'entertainment', address: 'Gòtic 9', hasReservations: false, tags: ['clubs'], availability: [], promoted: true, distanceKm: 0.8, imageUrl:'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&h=300&fit=crop' },
{ id: 've24', name: 'Craft Beer Co', category: 'entertainment', address: 'Poble Sec 14', hasReservations: false, tags: ['bars'], availability: [], promoted: false, distanceKm: 2.5, imageUrl:'https://images.unsplash.com/photo-1514362545857-3bc16c4c76f0?w=400&h=300&fit=crop' },
{ id: 've25', name: 'Sing Along BCN', category: 'entertainment', address: 'Sants 22', hasReservations: true, tags: ['karaoke'], availability: [], promoted: false, distanceKm: 3.6, imageUrl:'https://images.unsplash.com/photo-1571907480495-4f2f24c9d3a9?w=400&h=300&fit=crop' },
{ id: 've26', name: 'Disco Luna', category: 'entertainment', address: 'Diagonal 310', hasReservations: false, tags: ['clubs'], availability: [], promoted: true, distanceKm: 3.0, imageUrl:'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&h=300&fit=crop' },
{ id: 've27', name: 'Wine & Tapas', category: 'entertainment', address: 'Born 70', hasReservations: false, tags: ['bars'], availability: [], promoted: false, distanceKm: 1.7, imageUrl:'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400&h=300&fit=crop' },
{ id: 've28', name: 'Retro Karaoke', category: 'entertainment', address: 'Eixample 199', hasReservations: true, tags: ['karaoke'], availability: [], promoted: true, distanceKm: 2.8, imageUrl:'https://images.unsplash.com/photo-1571907480495-4f2f24c9d3a9?w=400&h=300&fit=crop' },
{ id: 've29', name: 'Neon Club', category: 'entertainment', address: 'Port 5', hasReservations: false, tags: ['clubs'], availability: [], promoted: true, distanceKm: 4.0, imageUrl:'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&h=300&fit=crop' },
{ id: 've30', name: 'Sky Bar', category: 'entertainment', address: 'Rooftop 1', hasReservations: false, tags: ['bars'], availability: [], promoted: false, distanceKm: 1.0, imageUrl:'https://images.unsplash.com/photo-1514362545857-3bc16c4c76f0?w=400&h=300&fit=crop' },
{ id: 've31', name: 'Club Prisma', category: 'entertainment', address: 'Diagonal 88', hasReservations: false, tags: ['clubs'], availability: [], promoted: true, distanceKm: 2.1, imageUrl:'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&h=300&fit=crop' },
{ id: 've32', name: 'Taproom 2', category: 'entertainment', address: 'Sants 8', hasReservations: false, tags: ['bars'], availability: [], promoted: false, distanceKm: 2.9, imageUrl:'https://images.unsplash.com/photo-1514362545857-3bc16c4c76f0?w=400&h=300&fit=crop' },
{ id: 've33', name: 'Karaoke Box', category: 'entertainment', address: 'Les Corts 19', hasReservations: true, tags: ['karaoke'], availability: [], promoted: false, distanceKm: 3.1, imageUrl:'https://images.unsplash.com/photo-1571907480495-4f2f24c9d3a9?w=400&h=300&fit=crop' },
{ id: 've34', name: 'Electro Club', category: 'entertainment', address: 'Raval 88', hasReservations: false, tags: ['clubs'], availability: [], promoted: true, distanceKm: 1.6, imageUrl:'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&h=300&fit=crop' },
{ id: 've35', name: 'Old Town Pub', category: 'entertainment', address: 'Gòtic 44', hasReservations: false, tags: ['bars'], availability: [], promoted: false, distanceKm: 0.6, imageUrl:'https://images.unsplash.com/photo-1514362545857-3bc16c4c76f0?w=400&h=300&fit=crop' }
];
