import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {holidayKeys, invitationsKeys} from '../Querykeys.ts';
import {InvitationMutation} from '../Models/Invitation.ts';
import InvitationRequestsApi from '../EndPoints/Requests/InvitationRequestsApi.ts';

export const useGetInvitations = () => {
  return useQuery({
    queryKey: invitationsKeys.list(),
    queryFn: () => InvitationRequestsApi.getInvitations().then((content) => content.data),
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
  return useMutation(
    (invitationId: string) => InvitationRequestsApi.acceptInvitation(invitationId),
    {
    onSuccess: () => {
      client.invalidateQueries(invitationsKeys.all);
      client.invalidateQueries(holidayKeys.all);
    },
  });
};

export const useRefuseInvitation = () => {
  const client = useQueryClient();
  return useMutation((invitationId: string) => InvitationRequestsApi.refuseInvitation(invitationId), {
    onSuccess: () => {
      client.invalidateQueries(invitationsKeys.all);
    },
  });
};
