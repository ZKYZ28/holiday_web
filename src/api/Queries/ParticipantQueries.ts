import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import ParticipantRequestsApi from '../EndPoints/Requests/ParticipantRequestsApi.ts';
import {participantKeys} from '../Querykeys.ts';
import {Holiday} from "../Models/Holiday.ts";

export const useGetParticipants = (id : string) => {
  return useQuery({
    queryKey: participantKeys.all,
    queryFn: () => ParticipantRequestsApi.getParticipants(id).then((content) => content.data),
    initialData: [],
  });
};

export const useGetParticipantsByHoliday = (holidayId: string) => {
  return useQuery({
    queryKey: participantKeys.all,
    queryFn: () => ParticipantRequestsApi.getParticipantsByHoliday(holidayId).then((content) => content.data),
    initialData: [],
  });
};

export const useGetParticipantsCount = () => {
  return useQuery({
    queryKey: participantKeys.all,
    queryFn: () => ParticipantRequestsApi.getParticipantCount().then((content) => content.data),
    initialData: 0,
  });
};


export const useLeaveHoliday = (participantId: string) => {
  const client = useQueryClient();
  return useMutation((holiday: Holiday) => ParticipantRequestsApi.leaveHoliday(participantId, holiday), {
    onSuccess: () => {
      client.invalidateQueries(participantKeys.all);
    },
  });
};
