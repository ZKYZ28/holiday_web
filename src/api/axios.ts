import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7048',
  // headers: {
  //   // header custom here
  // },
});

export default axiosInstance;
