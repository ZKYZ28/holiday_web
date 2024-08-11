import axiosInstance from '../../axios.ts';
import {GoogleAuth, UserAuthentificated} from '../../Models/UserAuthentificated.ts';
import { Login } from '../../Models/Login.ts';
import CONFIGURATION from '../Configuration.ts';

class AuthentificationRequestsApi {
  static async createAccount(newAccount: Register) {
    return axiosInstance.post('/api/register',newAccount);
  }

  static async getUserData() {
    return axiosInstance.get<UserAuthentificated>(`${CONFIGURATION.API_ENDPOINT}/participant/user`);
  }

  static async loginAccount(loginData: Login) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/authentification/login`, loginData);
  }

  static async loginGoogle(tokenId: GoogleAuth) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/authentification/googleauth`, tokenId);
  }
}

export default AuthentificationRequestsApi;
