export const mockUsers = [
  {
    id: 1,
    name: "Sakura Haruno",
    username: "@sakura_cos",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura",
    bio: "Professional cosplayer | Anime enthusiast",
  },
  {
    id: 2,
    name: "Kaito Mizuki",
    username: "@kaito_blue",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kaito",
    bio: "Gaming cosplay specialist",
  },
  {
    id: 3,
    name: "Rin Takahashi",
    username: "@rin_cosplay",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rin",
    bio: "Costume maker & designer",
  },
  {
    id: 4,
    name: "Yuki Tanaka",
    username: "@yuki_cos",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki",
    bio: "Anime & manga lover",
  },
  {
    id: 5,
    name: "Hiro Nakamura",
    username: "@hiro_hero",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hiro",
    bio: "Comic con regular",
  },
  {
    id: 6,
    name: "Mei Chen",
    username: "@mei_cosplay",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mei",
    bio: "Props & makeup artist",
  },
  {
    id: 7,
    name: "Daichi Sato",
    username: "@daichi_cos",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daichi",
    bio: "Fantasy costume creator",
  },
  {
    id: 8,
    name: "Luna Park",
    username: "@luna_dress",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
    bio: "K-drama & anime cosplay",
  },
];

export const mockStories = [
  {
    id: 1,
    userId: 1,
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura",
    username: "Sakura",
    image:
      "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=300&h=400&fit=crop",
    hasNew: true,
  },
  {
    id: 2,
    userId: 2,
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kaito",
    username: "Kaito",
    image:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=400&fit=crop",
    hasNew: true,
  },
  {
    id: 3,
    userId: 3,
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rin",
    username: "Rin",
    image:
      "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=300&h=400&fit=crop",
    hasNew: false,
  },
  {
    id: 4,
    userId: 4,
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki",
    username: "Yuki",
    image:
      "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=300&h=400&fit=crop",
    hasNew: true,
  },
  {
    id: 5,
    userId: 5,
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hiro",
    username: "Hiro",
    image:
      "https://images.unsplash.com/photo-1608889825146-8877db3c5e0f?w=300&h=400&fit=crop",
    hasNew: false,
  },
  {
    id: 6,
    userId: 6,
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mei",
    username: "Mei",
    image:
      "https://images.unsplash.com/photo-1577193815243-8ccafed5df33?w=300&h=400&fit=crop",
    hasNew: true,
  },
];

export const mockPosts = [
  {
    id: 1,
    type: "post",
    userId: 1,
    user: mockUsers[0],
    content:
      "Finally finished my Nezuko cosplay! Took me 3 weeks to perfect the details. What do you think? 🌸",
    images: [
      "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=600&h=800&fit=crop",
    ],
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: "2 hours ago",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    type: "event",
    userId: null,
    eventTitle: "Anime Festival 2025",
    eventDate: "15 Aug 2025",
    eventLocation: "Jakarta Convention Center",
    eventPrice: "Rp 150,000",
    content:
      "Join the biggest anime festival of the year! Special guests, cosplay contests, and exclusive merchandise awaits!",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    ],
    likes: 892,
    comments: 156,
    shares: 234,
    timestamp: "5 hours ago",
    isLiked: true,
    isBookmarked: true,
    eventBadge: "Upcoming Event",
  },
  {
    id: 3,
    type: "post",
    userId: 2,
    user: mockUsers[1],
    content:
      "Cloud Strife costume photoshoot! The buster sword took forever to craft but it was worth it ⚔️",
    images: [
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&h=800&fit=crop",
      "https://images.unsplash.com/photo-1608889825146-8877db3c5e0f?w=600&h=800&fit=crop",
    ],
    likes: 567,
    comments: 89,
    shares: 34,
    timestamp: "8 hours ago",
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 4,
    type: "costume",
    userId: 3,
    user: mockUsers[2],
    content:
      "NEW COSTUME AVAILABLE FOR RENT! Violet Evergarden complete set with accessories. Perfect condition!",
    images: [
      "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=600&h=800&fit=crop",
    ],
    likes: 445,
    comments: 67,
    shares: 89,
    timestamp: "12 hours ago",
    isLiked: false,
    isBookmarked: true,
    costumeBadge: "Available",
    rentalPrice: "Rp 300,000/day",
    franchise: "Anime",
  },
  {
    id: 5,
    type: "post",
    userId: 4,
    user: mockUsers[3],
    content:
      "Group cosplay with the squad! Attack on Titan Survey Corps. Ready to slay some titans! 💪",
    images: [
      "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=600&h=800&fit=crop",
    ],
    likes: 1234,
    comments: 234,
    shares: 156,
    timestamp: "1 day ago",
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: 6,
    type: "event",
    userId: null,
    eventTitle: "Cosplay Workshop: Armor Crafting",
    eventDate: "22 Aug 2025",
    eventLocation: "Cosplay Studio Jakarta",
    eventPrice: "Rp 250,000",
    content:
      "Learn professional armor crafting techniques from experienced cosplayers. Limited slots available!",
    images: [
      "https://images.unsplash.com/photo-1577193815243-8ccafed5df33?w=600&h=400&fit=crop",
    ],
    likes: 345,
    comments: 78,
    shares: 45,
    timestamp: "1 day ago",
    isLiked: false,
    isBookmarked: false,
    eventBadge: "Workshop",
  },
  {
    id: 7,
    type: "post",
    userId: 5,
    user: mockUsers[4],
    content:
      "Behind the scenes of my Geralt of Rivia cosplay. The details on this armor are insane!",
    images: [
      "https://images.unsplash.com/photo-1608889825146-8877db3c5e0f?w=600&h=800&fit=crop",
    ],
    likes: 678,
    comments: 123,
    shares: 56,
    timestamp: "2 days ago",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 8,
    type: "costume",
    userId: 6,
    user: mockUsers[5],
    content:
      "PREMIUM RENTAL: Genshin Impact Raiden Shogun costume. Authentic details, LED effects included!",
    images: [
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&h=800&fit=crop",
    ],
    likes: 889,
    comments: 167,
    shares: 234,
    timestamp: "2 days ago",
    isLiked: true,
    isBookmarked: true,
    costumeBadge: "Premium",
    rentalPrice: "Rp 500,000/day",
    franchise: "Game",
  },
];

export const mockFeatures = [
  {
    id: 1,
    title: "Social Feed",
    description:
      "Connect with fellow cosplayers, share your work, and get inspired by the community.",
    icon: "users",
  },
  {
    id: 2,
    title: "Event Discovery",
    description:
      "Find and join cosplay events, conventions, and meetups near you.",
    icon: "calendar",
  },
  {
    id: 3,
    title: "Costume Rental",
    description:
      "Rent high-quality costumes or list your own creations for others to use.",
    icon: "shirt",
  },
  {
    id: 4,
    title: "Community",
    description:
      "Join a vibrant community of passionate cosplayers from around the world.",
    icon: "heart",
  },
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Sakura Haruno",
    username: "@sakura_cos",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura",
    content:
      "This platform changed my cosplay journey! Found amazing costumes and made so many friends.",
    rating: 5,
  },
  {
    id: 2,
    name: "Kaito Mizuki",
    username: "@kaito_blue",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kaito",
    content:
      "Best place to discover events and connect with the cosplay community. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Rin Takahashi",
    username: "@rin_cosplay",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rin",
    content:
      "Love the costume rental feature! Makes trying new characters so much easier and affordable.",
    rating: 5,
  },
];
