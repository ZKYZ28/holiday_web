// HOLIDAY

import { Holiday, HolidayMutation } from '../../Models/Holiday.ts';
import axiosInstance from '../../axios.ts';
import { ENDPOINT } from '../EndPointApi.ts';

class HolidayRequestsApi {
  static async createHoliday(holiday: HolidayMutation) {
    return axiosInstance.post(`${ENDPOINT}/holiday`, holiday);
  }

  static async getAllHoliday(participantId: string) {
    return axiosInstance.get<Holiday[]>(`${ENDPOINT}/holiday/all/${participantId}`);
  }

  static async getHolidayById(holidayId: string) {
    return axiosInstance.get<Holiday>(`${ENDPOINT}/holiday/${holidayId}`);
  }

  static async getAllHolidayCountForDate(date : string) {
    return axiosInstance.get<number>(`${ENDPOINT}/holiday/date/${date}`);
  }
}

export default HolidayRequestsApi;
