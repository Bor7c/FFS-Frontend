import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: "http://192.168.99.1:8000" });
// export const axiosInstance = axios.create({ baseURL: "http://192.168.51.1:8000" });
// export const axiosInstance = axios.create({ baseURL: "http://192.168.1.48:8000" });
