import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ParticipantRequestsApi from '../EndPoints/Requests/ParticipantRequestsApi.ts';
import { participantKeys } from '../Querykeys.ts';
import HolidayRequestsApi from '../EndPoints/Requests/HolidayRequestsApi.ts';

export const useGetParticipants = (id: string, isParticipated : boolean) => {
  return useQuery({
    queryKey: participantKeys.queryList(id),
    queryFn: () => ParticipantRequestsApi.getParticipants(id, isParticipated).then((content) => content.data),
    initialData: [],
  });
};

export const useGetParticipantsByHoliday = (holidayId: string, isParticipated : boolean) => {
  return useQuery({
    queryKey: participantKeys.queryListByHoliday(holidayId),
    queryFn: () => ParticipantRequestsApi.getParticipantsByHoliday(holidayId, isParticipated).then((content) => content.data),
    initialData: [],
  });
};

export const useGetParticipantsNotYetActivity = (activityId: string) => {
  return useQuery({
    queryKey: participantKeys.queryListNotYet(activityId),
    queryFn: () => ParticipantRequestsApi.getParticipantsNotYetActivity(activityId).then((content) => content.data),
    initialData: [],
  });
};

export const useGetParticipantsCount = () => {
  return useQuery({
    queryKey: participantKeys.count(),
    queryFn: () => ParticipantRequestsApi.getParticipantCount().then((content) => content.data),
    initialData: 0,
  });
};

export const useLeaveHoliday = () => {
  const client = useQueryClient();
  return useMutation((holidayId: string) => HolidayRequestsApi.leaveHoliday(holidayId), {
    onSuccess: () => {
      client.invalidateQueries(participantKeys.all);
    },
  });
};
