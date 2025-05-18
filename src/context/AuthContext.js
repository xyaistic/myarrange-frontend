import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

// Access environment variables directly
const API_BASE_URL = process.env.API_BASE_URL || 'https://4oga00p86kk6.share.zrok.io/api';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      checkAuth: async () => {
        try {
          const accessToken = await AsyncStorage.getItem('accessToken');
          if (accessToken) {
            set({
              token: accessToken,
              isAuthenticated: true
            });
            return true;
          }
          return false;
        } catch (error) {
          console.log('Error checking auth:', error);
          return false;
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
          console.log(response.data, 'loginData');
          //   await AsyncStorage.setItem('token', response.token);

          set({
            user: response.user,
            token: response.token,
            role: response.role,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },

      signup: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
          return response;
        } catch (error) {
          console.log(error)
          set({ error: error.message, isLoading: false });
        }
      },

      logout: async () => {
        const res = await AsyncStorage.getItem('accessToken');
        console.log(res, 'access token');
        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false
        });
      },

      clearError: () => set({ error: null }),

      otpVerify: async (verifyData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/verify`, verifyData);
          console.log(response.data, 'verifyOtpData');

          await AsyncStorage.setItem('accessToken', response?.data?.accessToken);
          await AsyncStorage.setItem('refreshToken', response?.data?.refreshToken);

          set({
            user: {
              id: response.data.id,
              username: response.data.username
            },
            token: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            isAuthenticated: true,
            isLoading: false
          });
          return response.data;
        } catch (error) {
          console.log(error);
          set({ error: error.message, isLoading: false });
          return null;
        }
      },
    }),
    {
      // name: 'auth-storage',
      //   storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
