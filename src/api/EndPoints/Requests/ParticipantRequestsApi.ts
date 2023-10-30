import axiosInstance from '../../axios.ts';
import { Participant } from '../../Models/Participant.ts';
import { Holiday } from '../../Models/Holiday.ts';
import CONFIGURATION from '../Configuration.ts';

class ParticipantRequestsApi {
  // PARTICIPANT
  static async getParticipants(id: string) {
    return axiosInstance.get<Participant[]>(`${CONFIGURATION.API_ENDPOINT}/participant/all/${id}`);
  }
  static async getParticipantsByHoliday(holidayId: string) {
    return axiosInstance.get<Participant[]>(`${CONFIGURATION.API_ENDPOINT}/participant/${holidayId}`);
  }

  static async getParticipantsNotYetActivity(activityId: string) {
    return axiosInstance.get<Participant[]>(`${CONFIGURATION.API_ENDPOINT}/participant/activity/${activityId}`);
  }

  static async getParticipantCount() {
    return axiosInstance.get<number>(`${CONFIGURATION.API_ENDPOINT}/participant/count`);
  }

  static async leaveHoliday(participantId: string, holiday: Holiday) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/participant/leave/${participantId}`, holiday);
  }
}

export default ParticipantRequestsApi;
