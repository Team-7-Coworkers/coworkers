import { create } from 'zustand';

interface UserState {
  user: { name: string; email: string } | null;
  token: string | null;
  setUser: (user: { name: string; email: string }) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token });
  },
  clearUser: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));

export default useUserStore;
