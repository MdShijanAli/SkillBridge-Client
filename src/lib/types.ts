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
