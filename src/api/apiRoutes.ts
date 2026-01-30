import { env } from "@/env";

const baseUrl = env.API_URL || "http://localhost:5000/api";

const createUrl = (path: string) => `${baseUrl}/${path}`;

export const apiRoutes = {
  auth: {
    login: createUrl("auth/login"),
    register: createUrl("auth/register"),
    me: createUrl("auth/me"),
  },

  users: {
    getAll: createUrl("users"),
    getById: (id: string) => createUrl(`users/${id}`),
    create: createUrl("users"),
    update: (id: string) => createUrl(`users/${id}`),
    delete: (id: string) => createUrl(`users/${id}`),
  },

  categories: {
    getAll: createUrl("categories"),
    getById: (id: string) => createUrl(`categories/${id}`),
    create: createUrl("categories"),
    update: (id: string) => createUrl(`categories/${id}`),
    delete: (id: string) => createUrl(`categories/${id}`),
  },
};
