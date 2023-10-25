import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Participate, ParticipateListUser } from '../Models/Participate.ts';
import ParticipateRequestsApi from '../EndPoints/Requests/ParticipateRequestsApi.ts';
import { participantKeys, participateKeys } from '../Querykeys.ts';

export const useCreateParticipates = () => {
  const client = useQueryClient();
  return useMutation((participates: ParticipateListUser[]) => ParticipateRequestsApi.createParticipates(participates), {
    onSuccess: () => {
      client.invalidateQueries(participateKeys.all);
    },
  });
};

export const useGetAllParticipatesByActivity = (activityId: string) => {
  return useQuery({
    queryKey: participateKeys.list(),
    queryFn: () => ParticipateRequestsApi.getAllParticipatesByActivity(activityId).then((content) => content.data),
    initialData: [],
  });
};

export const useDeleteParticipate = () => {
  const client = useQueryClient();
  return useMutation((participate: Participate) => ParticipateRequestsApi.deleteParticipate(participate), {
    onSuccess: () => {
      client.invalidateQueries(participantKeys.all);
    },
  });
};
