export interface User {
  email: string;
  emailVerified?: boolean;
  firstName?: string | null;
  id: string;
  image?: string | null;
  is_active: boolean;
  is_banned: boolean;
  lastName?: string | null;
  name: string;
  phone: string;
  profileImage?: string | null;
  location?: string;
  bio?: string | null;
  role: keyof Roles;
  createdAt: string;
  updatedAt: string;
}

export interface Roles {
  ADMIN: "ADMIN";
  TUTOR: "TUTOR";
  STUDENT: "STUDENT";
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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

export interface AvailabilitySlot {
  id?: string;
  tutorProfileId: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TutorData {
  bio: string;
  createdAt: string;
  email: string;
  emailVerified: boolean;
  first_name: string;
  id: string;
  image: string | null;
  is_active: boolean;
  is_banned: boolean;
  last_name: string;
  location: string | null;
  name: string;
  phone: string | null;
  profile_image: string | null;
  role: "TUTOR";
  totalSessions?: number;
  updatedAt: string;
  tutorProfile?: TutorProfile;
}

export interface TutorProfile {
  id: number;
  userId: string;
  title: string;
  subjects: string[];
  languages: string[];
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  experience: string;
  certifications: string[];
  categories: Category[];
  isFeatured: boolean;
  averageRating: number;
  yearsExperience: number;
  specialization: string;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
  totalSessions: number;
  education: string;
  availability: AvailabilitySlot[];
}

export interface PaginationMeta {
  totalItems: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
}
