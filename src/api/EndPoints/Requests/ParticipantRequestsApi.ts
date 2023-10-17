import axiosInstance from '../../axios.ts';
import { Participant } from '../../Models/Participant.ts';
import { ENDPOINT } from '../EndPointApi.ts';

class ParticipantRequestsApi {
  // PARTICIPANT
  static async getParticipants() {
    return axiosInstance.get<Participant[]>(`${ENDPOINT}/participant/all`);
  }
  static async getParticipantsByHoliday(holidayId: string) {
    return axiosInstance.get<Participant[]>(`${ENDPOINT}/participant/${holidayId}`);
  }

  static async getParticipantCount() {
    return axiosInstance.get<number>(`${ENDPOINT}/participant/count`);
  }
}

export default ParticipantRequestsApi;
