import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import HolidayApi from "../EndPoints/HolidayApi.ts";
import {invitationsKeys} from "../Querykeys.ts";
import {InvitationMutation} from "../Models/Invitation.ts";

export const useGetInvitations = (participanId : string) => {
  return useQuery({
    queryKey: ['invitation'],
    queryFn: () => HolidayApi.getInvitations(participanId).then((content) => content.data),
    initialData: [],
  });
};


export const useCreateInvitations = () => {
  const client = useQueryClient();
  return useMutation((invitations: InvitationMutation[]) => HolidayApi.createInvitations(invitations), {
    onSuccess: () => {
      client.invalidateQueries(invitationsKeys.all);
    },
  });
};
