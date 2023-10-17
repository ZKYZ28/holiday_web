import axiosInstance from '../../axios.ts';
import { UserAuthentificated } from '../../Models/UserAuthentificated.ts';
import { Login } from '../../Models/Login.ts';
import { ENDPOINT } from '../EndPointApi.ts';

class AuthentificationRequestsApi {
  static async createAccount(newAccount: Register) {
    return axiosInstance.post(`${ENDPOINT}/authentification/register`, newAccount);
  }

  static async getUserData() {
    return axiosInstance.get<UserAuthentificated>(`${ENDPOINT}/participant/user`);
  }

  static async loginAccount(loginData: Login) {
    return axiosInstance.post(`${ENDPOINT}/authentification/login`, loginData);
  }
}

export default AuthentificationRequestsApi;
