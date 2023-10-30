import axiosInstance from '../../axios.ts';
import { Mail } from '../../Models/Mail.ts';
import CONFIGURATION from '../Configuration.ts';

class MailRequestsApi {
  static async sendMail(email: Mail) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/mail/send`, email);
  }
}

export default MailRequestsApi;
