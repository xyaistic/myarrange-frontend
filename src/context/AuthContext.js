import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../constant/baseUrl';
import axiosInstance from '../utils/axiosInstance';

const API_BASE_URL = BASE_URL;

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      checkAuth: async () => {
        try {
          const accessToken = await AsyncStorage.getItem('accessToken');
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          const userData = await AsyncStorage.getItem('userData');

          if (accessToken) {
            const decoded = jwtDecode(accessToken);
            const currentTime = Math.floor(Date.now() / 1000);

            if (decoded.exp && decoded.exp < currentTime) {
              set({
                token: null,
                refreshToken: null,
                role: null,
                isAuthenticated: false
              });

              await AsyncStorage.removeItem('accessToken');
              await AsyncStorage.removeItem('refreshToken');
              return false;
            }

            set({
              user: JSON.parse(userData),
              token: accessToken,
              refreshToken,
              role: decoded?.role || null,
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
          const { accessToken, refreshToken, id, username } = response.data;

          const decoded = jwtDecode(accessToken);

          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);
          await AsyncStorage.setItem('userData', JSON.stringify({ id, username }));

          set({
            user: { id, username },
            token: accessToken,
            refreshToken,
            role: decoded?.role || null,
            isAuthenticated: true,
            isLoading: false
          });

          return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Login failed';
          set({ error: errorMessage, isLoading: false });
          return null;
        }
      },

      signup: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
          return response;
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
          set({ error: errorMessage, isLoading: false });
          return error.response || { status: 500, data: { message: errorMessage } };
        }
      },

      otpVerify: async (verifyData, type) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/verify`, verifyData);
          const { accessToken, refreshToken, id, username } = response.data;

          const decoded = jwtDecode(accessToken);
          await AsyncStorage.setItem('accessToken', accessToken);
          await AsyncStorage.setItem('refreshToken', refreshToken);
          await AsyncStorage.setItem('userData', JSON.stringify({ id, username }));

          set({
            user: { id, username },
            token: accessToken,
            refreshToken,
            role: decoded?.role || null,
            isAuthenticated: true,
            isLoading: false
          });

          return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'OTP verification failed';
          set({ error: errorMessage, isLoading: false });
          return null;
        }
      },

      refreshAuthToken: async () => {
        try {
          const currentRefreshToken = get().refreshToken || await AsyncStorage.getItem('refreshToken');
          if (!currentRefreshToken) throw new Error('No refresh token available');

          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken: currentRefreshToken });
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          const decoded = jwtDecode(accessToken);

          await AsyncStorage.setItem('accessToken', accessToken);
          if (newRefreshToken) {
            await AsyncStorage.setItem('refreshToken', newRefreshToken);
          }

          set({
            token: accessToken,
            refreshToken: newRefreshToken || currentRefreshToken,
            role: decoded?.role || null
          });

          return true;
        } catch (error) {
          console.log('Token refresh failed:', error);
          get().logout();
          return false;
        }
      },

      logout: async () => {
        try {
          const response = await axiosInstance.post(`${API_BASE_URL}/auth/logout`);
          console.log(response.data, 'logout response');
          if (response.status == 200) {
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
            set({
              user: null,
              token: null,
              refreshToken: null,
              role: null,
              isAuthenticated: false
            });
            return true;
          } else {
            return false;
          }
        } catch (error) {
          console.log('Error during logout:', error);
          return false;
        }
      },



      forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email: email });
          set({ isLoading: false });
          return response;
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Password reset request failed';
          set({ error: errorMessage, isLoading: false });
          return error.response || { status: 500, data: { message: errorMessage } };
        }
      },



      resetPassword: async (token, newPassword) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
            token,
            password: newPassword
          });
          set({ isLoading: false });
          return response;
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message || 'Password reset failed';
          set({ error: errorMessage, isLoading: false });
          return error.response || { status: 500, data: { message: errorMessage } };
        }
      },

      clearError: () => set({ error: null }),

    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        role: state.role
      })
    }
  )
);

export default useAuthStore;
