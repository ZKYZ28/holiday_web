import axiosInstance from '../axios.ts';
import { Holiday, HolidayMutation } from '../Models/Holiday.ts';
import {ActivityMutation} from "../Models/Activity.ts";

class HolidayApi {
  static ENDPOINT: string = '/v1';

  static async createHoliday(holiday: HolidayMutation) {
    return axiosInstance.post(`${this.ENDPOINT}/holiday`, holiday);
  }

  static async getAllHoliday() {
    return axiosInstance.get<Holiday[]>(`${this.ENDPOINT}/holiday/all`);
  }

  static async getHolidayById(holidayId : string) {
    return axiosInstance.get<Holiday>(`${this.ENDPOINT}/holiday/${holidayId}`);
  }

  static async createActivity(activity: ActivityMutation, holidayId : string) {
    return axiosInstance.post(`${this.ENDPOINT}/activity/${holidayId}`, activity);
  }
}


export default HolidayApi;
