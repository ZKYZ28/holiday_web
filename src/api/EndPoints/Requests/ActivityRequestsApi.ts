import { ENDPOINT } from '../EndPointApi.ts';
import {Activity, ActivitySendForm} from '../../Models/Activity.ts';
import axiosInstance from '../../axios.ts';

class ActivityRequestsApi {
  // ACTIVITY
  static async createActivity(activity: ActivitySendForm) {
    return axiosInstance.post(`${ENDPOINT}/activity/create`, activity);
  }

  static async deleteActivity(activity: Activity) {
    return axiosInstance.post(`${ENDPOINT}/activity/delete`, activity);
  }
}

export default ActivityRequestsApi;
