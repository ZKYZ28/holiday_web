import { useQuery } from '@tanstack/react-query';
import ParticipantRequestsApi from '../EndPoints/Requests/ParticipantRequestsApi.ts';
import { participantKeys } from '../Querykeys.ts';

export const userGetParticipants = () => {
  return useQuery({
    queryKey: participantKeys.all,
    queryFn: () => ParticipantRequestsApi.getParticipants().then((content) => content.data),
    initialData: [],
  });
};

export const usetGetParticipantsByHoliday = (holidayId: string) => {
  return useQuery({
    queryKey: participantKeys.all,
    queryFn: () => ParticipantRequestsApi.getParticipantsByHoliday(holidayId).then((content) => content.data),
    initialData: [],
  });
};

export const usetGetParticipantsCount = () => {
  return useQuery({
    queryKey: participantKeys.all,
    queryFn: () => ParticipantRequestsApi.getParticipantCount().then((content) => content.data),
    initialData: 0,
  });
};
