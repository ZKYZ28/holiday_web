// HOLIDAY

import { Holiday } from '../../Models/Holiday.ts';
import axiosInstance from '../../axios.ts';
import CONFIGURATION from '../Configuration.ts';
import {ParticipantCount} from "../../Models/CountParticipant.ts";

class HolidayRequestsApi {
  static async createHoliday(holiday: FormData) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/holiday`, holiday, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  }

  static async updateHoliday(holidayId: string, updatedHoliday: FormData) {
    return axiosInstance.put(`${CONFIGURATION.API_ENDPOINT}/holiday/${holidayId}`, updatedHoliday, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  }

  static async getAllHolidayByParticipant(participantId: string) {
    return axiosInstance.get<Holiday[]>(`${CONFIGURATION.API_ENDPOINT}/holiday/participant/${participantId}`);
  }

  static async getAllHolidayPublished() {
    return axiosInstance.get<Holiday[]>(`${CONFIGURATION.API_ENDPOINT}/holiday/published`);
  }

  static async getHolidayById(holidayId: string) {
    return axiosInstance.get<Holiday>(`${CONFIGURATION.API_ENDPOINT}/holiday/${holidayId}`);
  }

  static async getAllHolidayCountForDate(date: string) {
    return axiosInstance.get<ParticipantCount[]>(`${CONFIGURATION.API_ENDPOINT}/holiday/date/${date}`);
  }

  static async publishHoliday(holiday: Holiday) {
    return axiosInstance.put(`${CONFIGURATION.API_ENDPOINT}/holiday/publish`, holiday);
  }

  static async getExportHoliday(holidayId: string) {
    return axiosInstance.get(`${CONFIGURATION.API_ENDPOINT}/holiday/ics/${holidayId}`, {
      responseType: 'blob',
    });
  }

  static async deleteHoliday(holidayId: String) {
    return axiosInstance.delete(`${CONFIGURATION.API_ENDPOINT}/holiday/${holidayId}`);
  }
}

export default HolidayRequestsApi;
