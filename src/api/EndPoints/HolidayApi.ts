import axiosInstance from '../axios.ts';
import { Holiday, HolidayMutation } from '../Models/Holiday.ts';
import { ActivityMutation } from '../Models/Activity.ts';
import { UserAuthentificated } from '../Models/UserAuthentificated.ts';
import { Login } from '../Models/Login.ts';
import login from '../../pages/Login/Login.tsx';

class HolidayApi {
  static ENDPOINT: string = '/v1';

  static async createHoliday(holiday: HolidayMutation) {
    return axiosInstance.post(`${this.ENDPOINT}/holiday`, holiday);
  }

  static async getAllHoliday() {
    return axiosInstance.get<Holiday[]>(`${this.ENDPOINT}/holiday/all`);
  }

  static async getHolidayById(holidayId: string) {
    return axiosInstance.get<Holiday>(`${this.ENDPOINT}/holiday/${holidayId}`);
  }

  static async createActivity(activity: ActivityMutation, holidayId: string) {
    return axiosInstance.post(`${this.ENDPOINT}/activity/${holidayId}`, activity);
  }

  static async createAccount(newAccount: Register) {
    return axiosInstance.post(`${this.ENDPOINT}/authentification/register`, newAccount);
  }

  static async getUserData() {
    return axiosInstance.get<UserAuthentificated>(`${this.ENDPOINT}/participant/user`);
  }

  static async loginAccount(loginData: Login) {
    return axiosInstance.post(`${this.ENDPOINT}/authentification/login`, loginData);
  }
}

export default HolidayApi;
