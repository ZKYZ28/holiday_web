import axios, { AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider.tsx';
import { isInvalidToken } from '../provider/utils/JwtUtils.ts';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7048',
  // headers: {
  //   // header custom here
  // },
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     console.log('Interception de la requête');
//     const navigate = useNavigate();
//     const { token, jwtTokenInfo, setJwtToken } = useAuth();
//
//     if (token && jwtTokenInfo && isInvalidToken(jwtTokenInfo.exp)) {
//       console.log('ici');
//       // Déclenche le remove complet du token
//       setJwtToken(undefined);
//       navigate('/login', { replace: true });
//     }
//
//     return config;
//   },
//   (error) => {
//     return console.error(error);
//   }
// );

export default axiosInstance;
