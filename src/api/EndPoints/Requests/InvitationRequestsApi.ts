import axiosInstance from '../../axios.ts';
import { Invitation, InvitationMutation } from '../../Models/Invitation.ts';
import CONFIGURATION from '../Configuration.ts';

class InvitationRequestsApi {
  // INVITATION
  static async getInvitations(participantId: string) {
    return axiosInstance.get<Invitation[]>(`${CONFIGURATION.API_ENDPOINT}/invitation/all/${participantId}`);
  }

  static async createInvitations(invitations: InvitationMutation[]) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/invitation`, invitations);
  }

  static async acceptInvitation(invitation: Invitation) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/invitation/accept`, invitation);
  }

  static async refuseInvitation(invitation: Invitation) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/invitation/refuse`, invitation);
  }
}

export default InvitationRequestsApi;
