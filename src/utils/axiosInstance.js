import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../constant/baseUrl';

const API_BASE_URL = BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // If error is 401 and we haven't tried to refresh the token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }
                
                // Call refresh token endpoint
                const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refreshToken: refreshToken
                });
                
                if (!response.data || !response.data.accessToken) {
                    throw new Error('Invalid response from token refresh');
                }
                
                // Update tokens in storage
                await AsyncStorage.setItem('accessToken', response.data.accessToken);
                if (response.data.refreshToken) {
                    await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
                }
                
                // Update Authorization header and retry original request
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return axiosInstance(originalRequest);
                
            } catch (refreshError) {
                console.log('Token refresh failed:', refreshError);
                
                // Clear auth data and redirect to login
                await AsyncStorage.removeItem('accessToken');
                await AsyncStorage.removeItem('refreshToken');
                await AsyncStorage.removeItem('userData');
                
                // You might want to add navigation to login screen here
                // or handle it through a global event
                
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;
