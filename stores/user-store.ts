import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User } from '@/types/api/user';

type UserState = {
  user: User | null;
};

type UserActions = {
  setUser: (user: User) => void;
  updateUser: (partial: Partial<User>) => void;
  clearUser: () => void;
};

export type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : state.user,
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user',
    },
  ),
);
