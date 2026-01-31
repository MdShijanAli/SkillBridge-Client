// Dummy data for SkillBridge

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "tutor" | "admin";
  avatar: string;
  createdAt: string;
  status: "active" | "banned";
}

export interface TutorProfile {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  subjects: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  totalSessions: number;
  verified: boolean;
  experience: string;
  education: string;
  languages: string[];
  availability: AvailabilitySlot[];
}

export interface AvailabilitySlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  tutorCount: number;
  description: string;
}

export interface Booking {
  id: string;
  tutorId: string;
  tutorName: string;
  tutorAvatar: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  status: "confirmed" | "completed" | "cancelled";
  price: number;
}

export interface Review {
  id: string;
  tutorId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

// Categories
export const categories: Category[] = [
  {
    id: "1",
    name: "Mathematics",
    icon: "📐",
    tutorCount: 156,
    description: "Algebra, Calculus, Statistics & more",
  },
  {
    id: "2",
    name: "Science",
    icon: "🔬",
    tutorCount: 124,
    description: "Physics, Chemistry, Biology",
  },
  {
    id: "3",
    name: "Languages",
    icon: "🌍",
    tutorCount: 203,
    description: "English, Spanish, French & more",
  },
  {
    id: "4",
    name: "Programming",
    icon: "💻",
    tutorCount: 189,
    description: "Python, JavaScript, Java & more",
  },
  {
    id: "5",
    name: "Music",
    icon: "🎵",
    tutorCount: 87,
    description: "Piano, Guitar, Vocals & more",
  },
  {
    id: "6",
    name: "Business",
    icon: "📈",
    tutorCount: 92,
    description: "Finance, Marketing, Management",
  },
  {
    id: "7",
    name: "Art & Design",
    icon: "🎨",
    tutorCount: 68,
    description: "Drawing, Painting, Digital Art",
  },
  {
    id: "8",
    name: "Test Prep",
    icon: "📝",
    tutorCount: 145,
    description: "SAT, GRE, TOEFL & more",
  },
];

// Tutors
export const tutors: TutorProfile[] = [
  {
    id: "1",
    userId: "u1",
    name: "Dr. Sarah Chen",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    title: "Mathematics Professor",
    bio: "Ph.D. in Applied Mathematics from MIT. 10+ years teaching experience. Specialized in making complex concepts simple and accessible for all students.",
    subjects: ["Calculus", "Linear Algebra", "Statistics"],
    hourlyRate: 75,
    rating: 4.9,
    reviewCount: 234,
    totalSessions: 1250,
    verified: true,
    experience: "10+ years",
    education: "Ph.D. Mathematics, MIT",
    languages: ["English", "Mandarin"],
    availability: [
      { id: "a1", day: "Monday", startTime: "09:00", endTime: "17:00" },
      { id: "a2", day: "Wednesday", startTime: "09:00", endTime: "17:00" },
      { id: "a3", day: "Friday", startTime: "09:00", endTime: "14:00" },
    ],
  },
  {
    id: "2",
    userId: "u2",
    name: "James Wilson",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    title: "Software Engineer & CS Tutor",
    bio: "Former Google engineer with passion for teaching. Helping students master programming fundamentals and crack coding interviews.",
    subjects: ["Python", "JavaScript", "Data Structures", "Algorithms"],
    hourlyRate: 85,
    rating: 4.8,
    reviewCount: 189,
    totalSessions: 890,
    verified: true,
    experience: "8 years",
    education: "M.S. Computer Science, Stanford",
    languages: ["English"],
    availability: [
      { id: "a4", day: "Tuesday", startTime: "10:00", endTime: "18:00" },
      { id: "a5", day: "Thursday", startTime: "10:00", endTime: "18:00" },
      { id: "a6", day: "Saturday", startTime: "09:00", endTime: "15:00" },
    ],
  },
  {
    id: "3",
    userId: "u3",
    name: "Maria Garcia",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    title: "Spanish & French Teacher",
    bio: "Native Spanish speaker with French certification. My interactive approach helps students become confident speakers in months, not years.",
    subjects: ["Spanish", "French", "ESL"],
    hourlyRate: 55,
    rating: 4.9,
    reviewCount: 312,
    totalSessions: 1560,
    verified: true,
    experience: "12 years",
    education: "B.A. Languages, Universidad Complutense",
    languages: ["Spanish", "French", "English", "Portuguese"],
    availability: [
      { id: "a7", day: "Monday", startTime: "08:00", endTime: "16:00" },
      { id: "a8", day: "Tuesday", startTime: "08:00", endTime: "16:00" },
      { id: "a9", day: "Wednesday", startTime: "08:00", endTime: "16:00" },
    ],
  },
  {
    id: "4",
    userId: "u4",
    name: "Dr. Michael Brown",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    title: "Physics Expert",
    bio: "NASA research scientist turned educator. Making physics fun and intuitive through real-world examples and hands-on problem solving.",
    subjects: ["Physics", "Astronomy", "AP Physics"],
    hourlyRate: 90,
    rating: 4.7,
    reviewCount: 156,
    totalSessions: 720,
    verified: true,
    experience: "15 years",
    education: "Ph.D. Astrophysics, Caltech",
    languages: ["English"],
    availability: [
      { id: "a10", day: "Thursday", startTime: "14:00", endTime: "20:00" },
      { id: "a11", day: "Friday", startTime: "14:00", endTime: "20:00" },
      { id: "a12", day: "Sunday", startTime: "10:00", endTime: "18:00" },
    ],
  },
  {
    id: "5",
    userId: "u5",
    name: "Emily Johnson",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    title: "Music Instructor",
    bio: "Juilliard graduate and professional pianist. Teaching piano and music theory to all ages with patience and enthusiasm.",
    subjects: ["Piano", "Music Theory", "Composition"],
    hourlyRate: 65,
    rating: 5.0,
    reviewCount: 98,
    totalSessions: 450,
    verified: true,
    experience: "7 years",
    education: "M.M. Piano Performance, Juilliard",
    languages: ["English", "Korean"],
    availability: [
      { id: "a13", day: "Monday", startTime: "12:00", endTime: "20:00" },
      { id: "a14", day: "Wednesday", startTime: "12:00", endTime: "20:00" },
      { id: "a15", day: "Saturday", startTime: "10:00", endTime: "18:00" },
    ],
  },
  {
    id: "6",
    userId: "u6",
    name: "David Lee",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    title: "Business & Finance Coach",
    bio: "MBA from Wharton, 15 years in investment banking. Now helping aspiring professionals and students master finance and business skills.",
    subjects: ["Finance", "Accounting", "Business Strategy"],
    hourlyRate: 120,
    rating: 4.8,
    reviewCount: 87,
    totalSessions: 380,
    verified: true,
    experience: "15 years",
    education: "MBA, Wharton School",
    languages: ["English", "Mandarin"],
    availability: [
      { id: "a16", day: "Tuesday", startTime: "18:00", endTime: "22:00" },
      { id: "a17", day: "Thursday", startTime: "18:00", endTime: "22:00" },
      { id: "a18", day: "Sunday", startTime: "14:00", endTime: "20:00" },
    ],
  },
];

// Users
export const users: User[] = [
  {
    id: "u1",
    name: "Dr. Sarah Chen",
    email: "sarah@example.com",
    role: "tutor",
    avatar: tutors[0].avatar,
    createdAt: "2023-01-15",
    status: "active",
  },
  {
    id: "u2",
    name: "James Wilson",
    email: "james@example.com",
    role: "tutor",
    avatar: tutors[1].avatar,
    createdAt: "2023-02-20",
    status: "active",
  },
  {
    id: "u3",
    name: "Maria Garcia",
    email: "maria@example.com",
    role: "tutor",
    avatar: tutors[2].avatar,
    createdAt: "2023-03-10",
    status: "active",
  },
  {
    id: "u4",
    name: "Dr. Michael Brown",
    email: "michael@example.com",
    role: "tutor",
    avatar: tutors[3].avatar,
    createdAt: "2023-04-05",
    status: "active",
  },
  {
    id: "u5",
    name: "Emily Johnson",
    email: "emily@example.com",
    role: "tutor",
    avatar: tutors[4].avatar,
    createdAt: "2023-05-18",
    status: "active",
  },
  {
    id: "u6",
    name: "David Lee",
    email: "david@example.com",
    role: "tutor",
    avatar: tutors[5].avatar,
    createdAt: "2023-06-22",
    status: "active",
  },
  {
    id: "s1",
    name: "Alex Thompson",
    email: "alex@example.com",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-01-10",
    status: "active",
  },
  {
    id: "s2",
    name: "Jessica Martinez",
    email: "jessica@example.com",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-01-15",
    status: "active",
  },
  {
    id: "s3",
    name: "Ryan Kim",
    email: "ryan@example.com",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-02-01",
    status: "active",
  },
  {
    id: "s4",
    name: "Sophia Patel",
    email: "sophia@example.com",
    role: "student",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    createdAt: "2024-02-10",
    status: "banned",
  },
  {
    id: "a1",
    name: "Admin User",
    email: "admin@skillbridge.com",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    createdAt: "2022-01-01",
    status: "active",
  },
];

// Bookings
export const bookings: Booking[] = [
  {
    id: "b1",
    tutorId: "1",
    tutorName: "Dr. Sarah Chen",
    tutorAvatar: tutors[0].avatar,
    studentId: "s1",
    studentName: "Alex Thompson",
    studentAvatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face",
    subject: "Calculus",
    date: "2024-02-15",
    time: "10:00",
    duration: 60,
    status: "completed",
    price: 75,
  },
  {
    id: "b2",
    tutorId: "2",
    tutorName: "James Wilson",
    tutorAvatar: tutors[1].avatar,
    studentId: "s1",
    studentName: "Alex Thompson",
    studentAvatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face",
    subject: "Python",
    date: "2024-02-20",
    time: "14:00",
    duration: 90,
    status: "confirmed",
    price: 127.5,
  },
  {
    id: "b3",
    tutorId: "3",
    tutorName: "Maria Garcia",
    tutorAvatar: tutors[2].avatar,
    studentId: "s2",
    studentName: "Jessica Martinez",
    studentAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    subject: "Spanish",
    date: "2024-02-18",
    time: "09:00",
    duration: 60,
    status: "confirmed",
    price: 55,
  },
  {
    id: "b4",
    tutorId: "1",
    tutorName: "Dr. Sarah Chen",
    tutorAvatar: tutors[0].avatar,
    studentId: "s3",
    studentName: "Ryan Kim",
    studentAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    subject: "Statistics",
    date: "2024-02-10",
    time: "11:00",
    duration: 60,
    status: "cancelled",
    price: 75,
  },
  {
    id: "b5",
    tutorId: "4",
    tutorName: "Dr. Michael Brown",
    tutorAvatar: tutors[3].avatar,
    studentId: "s1",
    studentName: "Alex Thompson",
    studentAvatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face",
    subject: "Physics",
    date: "2024-02-22",
    time: "15:00",
    duration: 60,
    status: "confirmed",
    price: 90,
  },
];

// Reviews
export const reviews: Review[] = [
  {
    id: "r1",
    tutorId: "1",
    studentId: "s1",
    studentName: "Alex Thompson",
    studentAvatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    comment:
      "Dr. Chen is amazing! She explained complex calculus concepts in a way that finally made sense to me. Highly recommend!",
    date: "2024-02-16",
  },
  {
    id: "r2",
    tutorId: "1",
    studentId: "s2",
    studentName: "Jessica Martinez",
    studentAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    comment:
      "Excellent tutor! Very patient and knowledgeable. My grades improved significantly after just a few sessions.",
    date: "2024-02-10",
  },
  {
    id: "r3",
    tutorId: "2",
    studentId: "s3",
    studentName: "Ryan Kim",
    studentAvatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    rating: 4,
    comment:
      "James is a great programming tutor. He helped me prepare for my technical interviews at top tech companies.",
    date: "2024-02-08",
  },
  {
    id: "r4",
    tutorId: "3",
    studentId: "s1",
    studentName: "Alex Thompson",
    studentAvatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    comment:
      "Maria made learning Spanish so fun! Her conversational approach is exactly what I needed.",
    date: "2024-02-05",
  },
];

// Current logged in user (for demo purposes)
export const currentUser: User = users[6]; // Alex Thompson - student

export const currentTutor: TutorProfile = tutors[0]; // Dr. Sarah Chen
