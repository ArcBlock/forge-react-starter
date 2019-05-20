import axios from 'axios';
import { getToken } from './auth';

axios.defaults.baseURL = process.env.apiPrefix || '';
axios.defaults.timeout = 200000;

axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axios;
