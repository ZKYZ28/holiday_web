// HOLIDAY

import { Holiday } from '../../Models/Holiday.ts';
import axiosInstance from '../../axios.ts';
import CONFIGURATION from '../Configuration.ts';
import { Participant } from '../../Models/Participant.ts';

class HolidayRequestsApi {
  static async createHoliday(holiday: FormData) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/holidays`, holiday, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  }

  static async updateHoliday(holidayId: string, updatedHoliday: FormData) {
    return axiosInstance.put(`${CONFIGURATION.API_ENDPOINT}/holidays/${holidayId}`, updatedHoliday, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  }

  static async getAllHolidayByParticipant(isPublished: boolean) {
    return axiosInstance.get<Holiday[]>(`${CONFIGURATION.API_ENDPOINT}/holidays/`, {
      params: { isPublished: isPublished },
    });
  }

  static async getAllHolidayPublished(isPublished: boolean) {
    return axiosInstance.get<Holiday[]>(`${CONFIGURATION.API_ENDPOINT}/holidays/`, {
      params: { isPublished: isPublished },
    });
  }

  static async getParticipantsByHoliday(holidayId: string, isParticipated: boolean) {
    return axiosInstance.get<Participant[]>(`${CONFIGURATION.API_ENDPOINT}/holidays/${holidayId}/participants`, {
      params: { isParticipated: isParticipated },
    });
  }

  static async getHolidayById(holidayId: string) {
    return axiosInstance.get<Holiday>(`${CONFIGURATION.API_ENDPOINT}/holidays/${holidayId}`);
  }

  static async publishHoliday(holiday: Holiday) {
    return axiosInstance.put(`${CONFIGURATION.API_ENDPOINT}/holidays/publish`, holiday);
  }

  static async getExportHoliday(holidayId: string) {
    return axiosInstance.get(`${CONFIGURATION.API_ENDPOINT}/holidays/${holidayId}/ics`, {
      responseType: 'blob',
    });
  }

  static async deleteHoliday(holidayId: string) {
    return axiosInstance.delete(`${CONFIGURATION.API_ENDPOINT}/holidays/${holidayId}`);
  }

  static async leaveHoliday(holidayId: string) {
    return axiosInstance.delete(`${CONFIGURATION.API_ENDPOINT}/holidays/${holidayId}/leave`);
  }
}

export default HolidayRequestsApi;
