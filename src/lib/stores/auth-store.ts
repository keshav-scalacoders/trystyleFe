import { create } from 'zustand';

interface AuthStore {
  token: string | null;
  user: Record<string, any> | null;
  isLoggedIn: boolean;
  login: (token: string, user?: Record<string, any> | null, remember?: boolean) => void;
  logout: () => void;
  init: () => void;
}

/**
 * Custom zustand store for auth that persists token+user to either localStorage or sessionStorage
 * depending on the remember flag passed to login.
 */
export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,
  isLoggedIn: false,

  login: (token: string, user: Record<string, any> | null = null, remember = true) => {
    // clear both storages first
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    } catch (e) {}

    try {
      if (remember) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    } catch (e) {}

    set({ token, user, isLoggedIn: !!token });
  },

  logout: () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    } catch (e) {}
    set({ token: null, user: null, isLoggedIn: false });
  },

  init: () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const rawUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      const user = rawUser ? JSON.parse(rawUser) : null;
      set({ token, user, isLoggedIn: !!token });
    } catch (e) {
      set({ token: null, user: null, isLoggedIn: false });
    }
  },
}));
