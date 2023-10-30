import axiosInstance from '../../axios.ts';
import { Participate, ParticipateListUser } from '../../Models/Participate.ts';
import CONFIGURATION from '../Configuration.ts';

class ParticipateRequestsApi {
  static async createParticipates(participates: ParticipateListUser[]) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/participate`, participates);
  }

  static async getAllParticipatesByActivity(activityId: string) {
    return axiosInstance.get<Participate[]>(`${CONFIGURATION.API_ENDPOINT}/participate/allByActivity/${activityId}`);
  }

  static async deleteParticipate(participate: Participate) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/participate/delete`, participate);
  }
}

export default ParticipateRequestsApi;
