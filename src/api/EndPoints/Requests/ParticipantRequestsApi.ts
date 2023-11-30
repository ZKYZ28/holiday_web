import axiosInstance from '../../axios.ts';
import { Participant } from '../../Models/Participant.ts';
import CONFIGURATION from '../Configuration.ts';

class ParticipantRequestsApi {
  // PARTICIPANT

  static async getParticipantsByHoliday(holidayId: string, isParticipated : boolean) {
    return axiosInstance.get<Participant[]>(`${CONFIGURATION.API_ENDPOINT}/invitation/participant/holiday/${holidayId}`, {
      params : {isParticipated : isParticipated}
    });
  }

  static async getParticipantsNotYetActivity(activityId: string) {
    return axiosInstance.get<Participant[]>(`${CONFIGURATION.API_ENDPOINT}/participant/activity/${activityId}`);
  }

  static async getParticipantCount() {
    return axiosInstance.get<number>(`${CONFIGURATION.API_ENDPOINT}/participant/count`);
  }

  static async getParticipants(holidayId: string, isParticipated: boolean) {
    return axiosInstance.get<Participant[]>(
        `${CONFIGURATION.API_ENDPOINT}/invitation/participant/holiday/${holidayId}`,
        {
          params: { isParticipated: isParticipated }, // nom : value
        }
    );
  }

}

export default ParticipantRequestsApi;
