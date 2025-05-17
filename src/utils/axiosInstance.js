import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_BASE_URL = process.env.API_BASE_URL || 'https://4oga00p86kk6.share.zrok.io/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = AsyncStorage.getItem('access');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.error("Request error: ", error);
        return Promise.reject(error);
    }
);

// ---------------- Add a response interceptor ----------------
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = AsyncStorage.getItem('refresh');
            if (refreshToken) {
                try {
                    const accessToken = AsyncStorage.getItem('access');
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    // const { data } = await axios.post(`${getRefreshToken}`, { refreshToken: refreshToken })
                    // console.log(data,'ooppp')
                    // // const  access  = data?.jwtToken;
                    // localStorage.setItem('access', access);
                    originalRequest.headers.Authorization = `Bearer ${access}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    console.error("Error refreshing token:", refreshError);
                    // localStorage.removeItem('access');
                    // localStorage.removeItem('refresh');
                    // window.location.pathname = '/';
                }
            } else {
                console.error("No refresh token available. Redirecting to login.");
                // window.location.pathname = '/';
            }
        }

        // Reject any other errors or 401 errors after retrying
        return Promise.reject(error);
    }
);

export default axiosInstance;
