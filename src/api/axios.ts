import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://porthos-intra.cg.helmo.be/q210054/holiday',
    headers: {
        // header custom here
    },
});

export default axiosInstance;
