import { useMutation, useQueryClient } from '@tanstack/react-query';
import { holidayKeys } from '../Querykeys.ts';
import {Activity} from '../Models/Activity.ts';
import ActivityRequestsApi from '../EndPoints/Requests/ActivityRequestsApi.ts';

export const useCreateActivity = () => {
  const client = useQueryClient();
  return useMutation((activity: FormData) => ActivityRequestsApi.createActivity(activity, holidayId), {
    onSuccess: () => {
      // L'invalidation se fait asynchronement mais ne renvoie pas de données, donc pas besoin du .then()
      client.invalidateQueries(holidayKeys.all);
    },
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
