import { ENDPOINT } from '../EndPointApi.ts';
import { ActivityMutation } from '../../Models/Activity.ts';
import axiosInstance from '../../axios.ts';

class ActivityRequestsApi {
  // ACTIVITY
  static async createActivity(activity: ActivityMutation, holidayId: string) {
    return axiosInstance.post(`${ENDPOINT}/activity/${holidayId}`, activity);
  }
}

export default ActivityRequestsApi;
