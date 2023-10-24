import axiosInstance from '../../axios.ts';
import { ENDPOINT } from '../EndPointApi.ts';
import {Participate, ParticipateMutation} from "../../Models/Participate.ts";

class ParticipateRequestsApi {

  static async createParticipates(participates: ParticipateMutation[]) {
    return axiosInstance.post(`${ENDPOINT}/participate`, participates);
  }

  static async getAllParticipatesByActivity(activityId: string) {
    return axiosInstance.get<Participate[]>(`${ENDPOINT}/participate/allByActivity/${activityId}`);
  }

  static async deleteParticipate(participate: Participate) {
    return axiosInstance.post(`${ENDPOINT}/participate/delete`, participate);
  }
}

export default ParticipateRequestsApi;
