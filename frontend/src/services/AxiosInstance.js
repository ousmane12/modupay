import axios from 'axios';
import { store } from '../store/store';

const axiosInstance = axios.create({
    baseURL: `http://localhost:8000/api/users`,
});

axiosInstance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const token = state.auth.auth.token;
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default axiosInstance;
