import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import HolidayApi from "../EndPoints/HolidayApi.ts";
import {holidayKeys, invitationsKeys} from "../Querykeys.ts";
import {InvitationMutation} from "../Models/Invitation.ts";
import {HolidayMutation} from "../Models/Holiday.ts";

export const useGetInvitations = (participantId : string) => {
  return useQuery({
    queryKey: ['invitation'],
    queryFn: () => HolidayApi.getInvitations(participantId).then((content) => content.data),
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
      client.invalidateQueries(holidayKeys.all);
    },
  });
};
