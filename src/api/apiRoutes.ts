// Use Next.js proxy instead of direct backend URL to ensure cookies work
const baseUrl = "/api";

const createUrl = (path: string) => `${baseUrl}/${path}`;

export const apiRoutes = {
  auth: {
    login: createUrl("auth/login"),
    register: createUrl("auth/sign-up/email"),
    me: createUrl("auth/me"),
  },

  users: {
    getAll: createUrl("users"),
    getById: (id: number | string) => createUrl(`users/${id}`),
    create: createUrl("users"),
    update: (id: number | string) => createUrl(`users/${id}`),
    delete: (id: number | string) => createUrl(`users/${id}`),
    changeStatus: (id: number | string) => createUrl(`users/${id}/status`),
  },

  tutor: {
    profile: createUrl("tutor-profiles"),
    getAll: createUrl("tutors"),
    getById: (id: number | string) => createUrl(`tutors/${id}`),
    getReviews: createUrl("tutors/reviews/me"),
  },

  categories: {
    getAll: createUrl("categories"),
    getById: (id: number) => createUrl(`categories/${id}`),
    create: createUrl("categories"),
    update: (id: number) => createUrl(`categories/${id}`),
    delete: (id: number) => createUrl(`categories/${id}`),
    changeStatus: (id: number | string) => createUrl(`categories/${id}/status`),
  },

  availabilities: {
    getAll: createUrl("availabilities"),
    create: createUrl("availabilities"),
    update: (id: number | string) => createUrl(`availabilities/${id}`),
    delete: (id: number | string) => createUrl(`availabilities/${id}`),
    changeStatus: (id: number | string) =>
      createUrl(`availabilities/${id}/status`),
  },

  bookings: {
    create: createUrl("bookings"),
    getAll: createUrl("bookings"),
    delete: (id: number | string) => createUrl(`bookings/${id}`),
    getById: (id: number | string) => createUrl(`bookings/${id}`),
    getMyBookings: (id: number | string) => createUrl(`bookings/me/${id}`),
    getByTutor: (id: number | string) => createUrl(`bookings/tutor/${id}`),
    updateStatus: (id: number | string) => createUrl(`bookings/${id}/status`),
  },

  reviews: {
    create: createUrl("reviews"),
  },

  dashboard: {
    studentStats: createUrl("dashboard/stats"),
    tutorStats: createUrl("dashboard/tutor-stats"),
    adminStats: createUrl("dashboard/admin-stats"),
  },

  subjects: {
    popularSubjects: createUrl("subjects/popular"),
  },
};
