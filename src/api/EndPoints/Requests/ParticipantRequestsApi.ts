import axiosInstance from '../../axios.ts';
import { Participant } from '../../Models/Participant.ts';
import { ENDPOINT } from '../EndPointApi.ts';
import {Holiday} from "../../Models/Holiday.ts";

class ParticipantRequestsApi {
  // PARTICIPANT
  static async getParticipants(id : string) {
    return axiosInstance.get<Participant[]>(`${ENDPOINT}/participant/all/${id}`);
  }
  static async getParticipantsByHoliday(holidayId: string) {
    return axiosInstance.get<Participant[]>(`${ENDPOINT}/participant/${holidayId}`);
  }

  static async getParticipantCount() {
    return axiosInstance.get<number>(`${ENDPOINT}/participant/count`);
  }

  static async leaveHoliday(participantId: string, holiday: Holiday) {
    return axiosInstance.post(`${ENDPOINT}/participant/leave/${participantId}`, holiday);
  }
}

export default ParticipantRequestsApi;
