import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
