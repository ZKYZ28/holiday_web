import axiosInstance from '../../axios.ts';
import {Invitation, InvitationMutation} from '../../Models/Invitation.ts';
import { ENDPOINT } from '../EndPointApi.ts';

class InvitationRequestsApi {
  // INVITATION
  static async getInvitations(participantId: string) {
    return axiosInstance.get<Invitation[]>(`${ENDPOINT}/invitation/all/${participantId}`);
  }

  static async createInvitations(invitations: InvitationMutation[]) {
    return axiosInstance.post(`${ENDPOINT}/invitation`, invitations);
  }

  static async acceptInvitation(invitation : InvitationMutation) {
    return axiosInstance.post(`${ENDPOINT}/invitation/accept`, invitation);
  }

  static async refuseInvitation(invitation : InvitationMutation) {
    return axiosInstance.post(`${ENDPOINT}/invitation/refuse`, invitation);
  }
}

export default InvitationRequestsApi;
