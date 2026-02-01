const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const createUrl = (path: string) => `${baseUrl}/${path}`;

export const apiRoutes = {
  auth: {
    login: createUrl("auth/login"),
    register: createUrl("auth/register"),
    me: createUrl("auth/me"),
  },

  users: {
    getAll: createUrl("users"),
    getById: (id: number | string) => createUrl(`users/${id}`),
    create: createUrl("users"),
    update: (id: number | string) => createUrl(`users/${id}`),
    delete: (id: number | string) => createUrl(`users/${id}`),
    changeStatus: (id: number | string) => createUrl(`users/${id}/status`),
    bannedUser: (id: number | string) => createUrl(`users/${id}/ban`),
  },

  tutor: {
    profile: createUrl("tutor-profiles"),
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
};
