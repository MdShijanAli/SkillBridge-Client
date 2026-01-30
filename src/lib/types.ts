export interface User {
  email: string;
  emailVerified?: boolean;
  firstName?: string | null;
  id: string;
  image?: string | null;
  isActive: boolean;
  isBanned: boolean;
  lastName?: string | null;
  name: string;
  phone: string;
  profileImage?: string | null;
  role: keyof Roles;
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
