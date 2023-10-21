import { ENDPOINT } from '../EndPointApi.ts';
import { ActivitySendForm} from '../../Models/Activity.ts';
import axiosInstance from '../../axios.ts';

class ActivityRequestsApi {
  // ACTIVITY
  static async createActivity(activity: ActivitySendForm, holidayId: string) {
    return axiosInstance.post(`${ENDPOINT}/activity/${holidayId}`, activity);
  }
}

export default ActivityRequestsApi;
