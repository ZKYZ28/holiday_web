import { Activity } from '../../Models/Activity.ts';
import axiosInstance from '../../axios.ts';
import CONFIGURATION from '../Configuration.ts';
import {Participant} from "../../Models/Participant.ts";

class ActivityRequestsApi {
  // ACTIVITY
  static async createActivity(activity: FormData) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/activities`, activity, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  }

  static async deleteActivity(activityId: string) {
    return axiosInstance.delete(`${CONFIGURATION.API_ENDPOINT}/activities/${activityId}`);
  }

  static async getActivityById(activityId: string) {
    return axiosInstance.get<Activity>(`${CONFIGURATION.API_ENDPOINT}/activities/${activityId}`);
  }

  static updateActivity(activityId: string, updatedActivity: FormData) {
    return axiosInstance.put(`${CONFIGURATION.API_ENDPOINT}/activities/${activityId}`, updatedActivity, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  }

  static async getParticipantByActivity(activityId: string, isParticipated: boolean) {
    return axiosInstance.get<Participant[]>(`${CONFIGURATION.API_ENDPOINT}/activities/${activityId}/participants`, {
      params : {isParticipated : isParticipated}
    });
  }

  static async deleteParticipate(activityId: string, participantId: string) {
    return axiosInstance.delete(`${CONFIGURATION.API_ENDPOINT}/activities/${activityId}/participants/${participantId}`);
  }

  static async createParticipate(activityId: string, participantId: string) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/activities/${activityId}/participants/${participantId}`);
  }

}

export default ActivityRequestsApi;
