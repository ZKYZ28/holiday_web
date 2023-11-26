import axiosInstance from '../../axios.ts';
import { Participate, ParticipateListUser } from '../../Models/Participate.ts';
import CONFIGURATION from '../Configuration.ts';

class ParticipateRequestsApi {
  static async createParticipates(participates: ParticipateListUser[]) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/participate`, participates);
  }

  static async getAllParticipatesByActivity(activityId: string) {
    return axiosInstance.get<Participate[]>(`${CONFIGURATION.API_ENDPOINT}/participate/activity/${activityId}`);
  }

  static async deleteParticipate(participateId: string) {
    return axiosInstance.delete(`${CONFIGURATION.API_ENDPOINT}/participate/${participateId}`);
  }
}

export default ParticipateRequestsApi;
