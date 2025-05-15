import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import {API_BASE_URL} from '@env'
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/login`, { email : '', password });
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
          const response = await axios.post(`https://nx50lq7a8dep.share.zrok.io/api/auth/register`, userData);
          console.log(response, 'resposnse')
          // await AsyncStorage.setItem('token', response.token);

          set({
            user: response.user,
            token: response.token,
            role: response.role,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          console.log(error)
          set({ error: error.message, isLoading: false });
        }
      },

      logout: async () => {
        // Remove token from AsyncStorage
        // await AsyncStorage.removeItem('token');

        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
    //   storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;