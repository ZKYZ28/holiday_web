// HOLIDAY

import { Holiday, HolidayMutation } from '../../Models/Holiday.ts';
import axiosInstance from '../../axios.ts';
import { ENDPOINT } from '../EndPointApi.ts';

class HolidayRequestsApi {
  static async createHoliday(holiday: HolidayMutation) {
    return axiosInstance.post(`${ENDPOINT}/holiday`, holiday);
  }

  static async getAllHoliday() {
    return axiosInstance.get<Holiday[]>(`${ENDPOINT}/holiday/all`);
  }

  static async getHolidayById(holidayId: string) {
    return axiosInstance.get<Holiday>(`${ENDPOINT}/holiday/${holidayId}`);
  }
}

export default HolidayRequestsApi;
