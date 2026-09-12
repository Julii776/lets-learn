const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API = {
  auth: {
    login: `${BASE_URL}/api/auth/login`,
    register: `${BASE_URL}/api/auth/register`,
    logout: `${BASE_URL}/api/auth/logout`,
  },

  users: {
    me: `${BASE_URL}/users`,
  },
} as const;
