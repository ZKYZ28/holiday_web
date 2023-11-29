import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {activityKeys, holidayKeys} from '../Querykeys.ts';
import ActivityRequestsApi from '../EndPoints/Requests/ActivityRequestsApi.ts';

export const useCreateActivity = () => {
  const client = useQueryClient();
  return useMutation((activity: FormData) => ActivityRequestsApi.createActivity(activity), {
    onSuccess: () => {
      client.invalidateQueries(activityKeys.all);
    },
  });
};

export const useUpdateActivity = () => {
  const client = useQueryClient();
  return useMutation(
    (data: { activityId: string; updatedActivity: FormData }) =>
      ActivityRequestsApi.updateActivity(data.activityId, data.updatedActivity),
    {
      onSuccess: () => {
        client.invalidateQueries(activityKeys.all);
      },
    }
  );
};

export const useGetActivityById = (activityId: string) => {
  return useQuery({
    queryKey: activityKeys.get(activityId),
    queryFn: () => ActivityRequestsApi.getActivityById(activityId).then((content) => content.data),
  });
};

export const useDeleteActivity = () => {
  const client = useQueryClient();
  return useMutation((activityId: string) => ActivityRequestsApi.deleteActivity(activityId), {
    onSuccess: () => {
      client.invalidateQueries(activityKeys.all);
    },
  });
};
