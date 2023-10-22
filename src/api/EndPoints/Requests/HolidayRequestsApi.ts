// HOLIDAY

import { Holiday, HolidaySendForm } from '../../Models/Holiday.ts';
import axiosInstance from '../../axios.ts';
import { ENDPOINT } from '../EndPointApi.ts';

class HolidayRequestsApi {
  static async createHoliday(holiday: FormData) {
    return axiosInstance.post(`${ENDPOINT}/holiday`, holiday, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  }

  static async getAllHolidayByParticipant(participantId: string) {
    return axiosInstance.get<Holiday[]>(`${ENDPOINT}/holiday/allByParticipant/${participantId}`);
  }

  static async getAllHolidayPublished() {
    return axiosInstance.get<Holiday[]>(`${ENDPOINT}/holiday/allPublished`);
  }

  static async getHolidayById(holidayId: string) {
    return axiosInstance.get<Holiday>(`${ENDPOINT}/holiday/${holidayId}`);
  }

  static async getAllHolidayCountForDate(date: string) {
    return axiosInstance.get<number>(`${ENDPOINT}/holiday/date/${date}`);
  }

  static async publishHoliday(holiday: Holiday) {
    return axiosInstance.post(`${ENDPOINT}/holiday/publish`, holiday);
  }

  static async getExportHoliday(holidayId: string) {
    return axiosInstance.get(`${ENDPOINT}/holiday/export/${holidayId}`, {
      responseType: 'blob',
    });
  }
}

export default HolidayRequestsApi;
