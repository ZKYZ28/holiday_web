import axiosInstance from '../../axios.ts';
import { ENDPOINT } from '../EndPointApi.ts';
import {Mail} from "../../Models/Mail.ts";

class MailRequestsApi {
  static async sendMail(email: Mail) {
    return axiosInstance.post(`${ENDPOINT}/mail/send`, email);
  }
}

export default MailRequestsApi;
