const baseUrl = import.meta.env.API_URL || "http://localhost:5000/api";

const createUrl = (path: string) => `${baseUrl}/${path}`;

export const apiRoutes = {
  auth: {
    login: createUrl("auth/login"),
    register: createUrl("auth/register"),
    me: createUrl("auth/me"),
  },
};
