import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {holidayKeys, invitationsKeys} from '../Querykeys.ts';
import {Invitation, InvitationMutation} from '../Models/Invitation.ts';
import InvitationRequestsApi from '../EndPoints/Requests/InvitationRequestsApi.ts';

export const useGetInvitations = (participantId: string) => {
  return useQuery({
    queryKey: invitationsKeys.queryList(participantId),
    queryFn: () => InvitationRequestsApi.getInvitations(participantId).then((content) => content.data),
    initialData: [],
  });
};

export const useCreateInvitations = () => {
  const client = useQueryClient();
  return useMutation((invitations: InvitationMutation[]) => InvitationRequestsApi.createInvitations(invitations), {
    onSuccess: () => {
      client.invalidateQueries(invitationsKeys.all);
    },
  });
};

export const useAcceptInvitation = () => {
  const client = useQueryClient();
  return useMutation((invitation: Invitation) => InvitationRequestsApi.acceptInvitation(invitation), {
    onSuccess: () => {
      client.invalidateQueries(invitationsKeys.all);
      client.invalidateQueries(holidayKeys.all);
    },
  });
};

export const useRefuseInvitation = () => {
  const client = useQueryClient();
  return useMutation((invitation: Invitation) => InvitationRequestsApi.refuseInvitation(invitation), {
    onSuccess: () => {
      client.invalidateQueries(invitationsKeys.all);
    },
  });
};
