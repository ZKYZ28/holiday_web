import axiosInstance from '../../axios.ts';
import { Invitation, InvitationMutation } from '../../Models/Invitation.ts';
import CONFIGURATION from '../Configuration.ts';

class InvitationRequestsApi {
  // INVITATION
  static async getInvitations(participantId: string) {
    return axiosInstance.get<Invitation[]>(`${CONFIGURATION.API_ENDPOINT}/invitation/participant/${participantId}`);
  }

  static async createInvitations(invitations: InvitationMutation[]) {
    return axiosInstance.post(`${CONFIGURATION.API_ENDPOINT}/invitation`, invitations);
  }

  static async acceptInvitation(invitation: Invitation) {
    return axiosInstance.put(`${CONFIGURATION.API_ENDPOINT}/invitation`, invitation);
  }

  static async refuseInvitation(invitationId: string) {
    return axiosInstance.delete(`${CONFIGURATION.API_ENDPOINT}/invitation/${invitationId}`);
  }
}

export default InvitationRequestsApi;
