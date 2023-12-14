import axios from 'axios';

export const axiosInstance = axios.create({ baseURL: "http://192.168.226.1:8000" });
// export const axiosInstance = axios.create({ baseURL: "http://192.168.51.1:8000" });
