import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { holidayKeys } from '../Querykeys.ts';
import { Activity } from '../Models/Activity.ts';
import ActivityRequestsApi from '../EndPoints/Requests/ActivityRequestsApi.ts';

export const useCreateActivity = () => {
  const client = useQueryClient();
  return useMutation((activity: FormData) => ActivityRequestsApi.createActivity(activity), {
    onSuccess: () => {
      client.invalidateQueries(holidayKeys.all);
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
        client.invalidateQueries(holidayKeys.all);
      },
    }
  );
};

export const useGetActivityById = (activityId: string) => {
  return useQuery({
    queryKey: holidayKeys.all,
    queryFn: () => ActivityRequestsApi.getActivityById(activityId).then((content) => content.data),
    initialData: {},
  });
};

export const useDeleteActivity = () => {
  const client = useQueryClient();
  return useMutation((activity: Activity) => ActivityRequestsApi.deleteActivity(activity), {
    onSuccess: () => {
      client.invalidateQueries(holidayKeys.all);
    },
  });
};
