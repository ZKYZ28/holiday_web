import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import HolidayApi from '../EndPoints/HolidayApi.ts';
import { invitationsKeys } from '../Querykeys.ts';
import { InvitationMutation } from '../Models/Invitation.ts';
import InvitationRequestsApi from '../EndPoints/Requests/InvitationRequestsApi.ts';

export const useGetInvitations = (participantId: string) => {
  return useQuery({
    queryKey: invitationsKeys.all,
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
  return useMutation((invitation: InvitationMutation) => HolidayApi.acceptInvitation(invitation), {
    onSuccess: () => {
      // L'invalidation se fait asynchronement mais ne renvoie pas de données, donc pas besoin du .then()
      client.invalidateQueries(invitationsKeys.all);
    },
  });
};

export const useRefuseInvitation = () => {
  const client = useQueryClient();
  return useMutation((invitation: InvitationMutation) => HolidayApi.refuseInvitation(invitation), {
    onSuccess: () => {
      // L'invalidation se fait asynchronement mais ne renvoie pas de données, donc pas besoin du .then()
      client.invalidateQueries(invitationsKeys.all);
    },
  });
};
