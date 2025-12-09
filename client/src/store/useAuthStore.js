import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,
  
  // Actions placeholders
  login: async (credentials) => {},
  register: async (userData) => {},
  logout: () => {},
}));

export default useAuthStore;