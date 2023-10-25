import { ENDPOINT } from '../EndPointApi.ts';
import {Activity} from '../../Models/Activity.ts';
import axiosInstance from '../../axios.ts';

class ActivityRequestsApi {
  // ACTIVITY
  static async createActivity(activity: FormData) {
    return axiosInstance.post(`${ENDPOINT}/activity/create`, activity, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  }

  static async deleteActivity(activity: Activity) {
    return axiosInstance.post(`${ENDPOINT}/activity/delete`, activity);
  }

  static async getActivityById(activityId: string) {
    return axiosInstance.get<Activity>(`${ENDPOINT}/activity/${activityId}`);
  }

  static updateActivity(activityId: string, updatedActivity: FormData) {
    return axiosInstance.put(`${ENDPOINT}/activity/${activityId}`, updatedActivity, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  }
}

export default ActivityRequestsApi;
