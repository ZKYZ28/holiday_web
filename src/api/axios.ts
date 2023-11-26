import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: 'https://localhost:7048',
  baseURL: import.meta.env.VITE_BASE_API,
  // baseURL: 'https://porthos-intra.cg.helmo.be/q210054',
  // headers: {
  //   // header custom here
  // },
});

export default axiosInstance;
