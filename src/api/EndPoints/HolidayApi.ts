import axiosInstance from '../axios.ts';
import { Holiday, HolidayMutation } from '../Models/Holiday.ts';
import { ActivityMutation } from '../Models/Activity.ts';
import { UserAuthentificated } from '../Models/UserAuthentificated.ts';
import { Login } from '../Models/Login.ts';
import login from '../../pages/Login/Login.tsx';
import {Weather} from '../Models/Weather.ts';
import {Participant} from '../Models/Participant.ts';
import {InvitationMutation} from '../Models/Invitation.ts';

class HolidayApi {
  static ENDPOINT: string = '/v1';

  //HOLIDAY
  static async createHoliday(holiday: HolidayMutation) {
    return axiosInstance.post(`${this.ENDPOINT}/holiday`, holiday);
  }

  static async getAllHoliday(participantId : string) {
    return axiosInstance.get<Holiday[]>(`${this.ENDPOINT}/holiday/all/${participantId}`);
  }

  static async getHolidayById(holidayId: string) {
    return axiosInstance.get<Holiday>(`${this.ENDPOINT}/holiday/${holidayId}`);
  }

  static async getAllHolidayCountForDate(date : string) {
    return axiosInstance.get<number>(`${this.ENDPOINT}/holiday/date/${date}`);
  }


  //ACTIVITY
  static async createActivity(activity: ActivityMutation, holidayId : string) {
    return axiosInstance.post(`${this.ENDPOINT}/activity/${holidayId}`, activity);
  }


  //WEATHER
  static async getWeather(holidayId : string) {
    return axiosInstance.get<Weather>(`${this.ENDPOINT}/weather/${holidayId}`);
  }

  //PARTICIPANT
  static async getParticipants(holidayId : string) {
    return axiosInstance.get<Participant>(`${this.ENDPOINT}/participant/all/${holidayId}`);
  }
  static async getParticipantsByHoliday(holidayId : string) {
    return axiosInstance.get<Participant>(`${this.ENDPOINT}/participant/${holidayId}`);
  }

  static async getParticipantCount() {
    return axiosInstance.get<number>(`${this.ENDPOINT}/participant/count`);
  }



  //INVITATION
  static async getInvitations(participantId : string) {
    return axiosInstance.get<Participant>(`${this.ENDPOINT}/invitation/all/${participantId}`);
  }

  static async createInvitations(invitations : InvitationMutation[]) {
    return axiosInstance.post(`${this.ENDPOINT}/invitation`, invitations);
  }

  static async acceptInvitation(invitation : InvitationMutation) {
    return axiosInstance.post(`${this.ENDPOINT}/invitation/accept`, invitation);
  }

  static async refuseInvitation(invitation : InvitationMutation) {
    return axiosInstance.post(`${this.ENDPOINT}/invitation/refuse`, invitation);
  }



  //ACCOUNT
  static async createAccount(newAccount: Register) {
    return axiosInstance.post(`${this.ENDPOINT}/authentification/register`, newAccount);
  }

  static async getUserData() {
    return axiosInstance.get<UserAuthentificated>(`${this.ENDPOINT}/participant/user`);
  }

  static async loginAccount(loginData: Login) {
    return axiosInstance.post(`${this.ENDPOINT}/authentification/login`, loginData);
  }
}

export default HolidayApi;
