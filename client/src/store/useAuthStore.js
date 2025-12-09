import { create } from 'zustand';
import { loginAPI, registerAPI } from '../services/authService'; // Import API đã tạo ở bước 8

const useAuthStore = create((set) => ({
  // 1. Initial State (Trạng thái ban đầu)
  // Lấy dữ liệu từ localStorage ngay khi app khởi chạy để giữ đăng nhập
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  // 2. Action Login
  login: async (credentials) => {
    set({ isLoading: true, error: null }); // Bắt đầu loading, reset lỗi cũ
    try {
      // Gọi API (Backend trả về: { _id, name, email, token })
      const data = await loginAPI(credentials);

      // Lưu vào LocalStorage
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);

      // Cập nhật State
      set({ 
        user: data, 
        token: data.token, 
        isLoading: false,
        error: null 
      });

      return data; // Trả về data để component có thể dùng nếu cần
    } catch (error) {
      // Lấy message lỗi từ Backend (Axios error structure)
      const message = error.response?.data?.message || 'Đăng nhập thất bại';
      set({ 
        isLoading: false, 
        error: message 
      });
      throw error; // Ném lỗi ra để component Login hiển thị Toast
    }
  },

  // 3. Action Register (Tương tự Login)
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await registerAPI(userData);

      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);

      set({ 
        user: data, 
        token: data.token, 
        isLoading: false,
        error: null 
      });
      
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Đăng ký thất bại';
      set({ 
        isLoading: false, 
        error: message 
      });
      throw error;
    }
  },

  // 4. Action Logout
  logout: () => {
    // Xóa sạch LocalStorage và Reset State
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, error: null });
  },
}));

export default useAuthStore;