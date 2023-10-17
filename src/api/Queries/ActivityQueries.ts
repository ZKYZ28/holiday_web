import { useMutation, useQueryClient } from '@tanstack/react-query';
import { holidayKeys } from '../Querykeys.ts';
import { ActivityMutation } from '../Models/Activity.ts';
import ActivityRequestsApi from '../EndPoints/Requests/ActivityRequestsApi.ts';

export const useCreateActivity = (holidayId: string) => {
  const client = useQueryClient();
  return useMutation((activity: ActivityMutation) => ActivityRequestsApi.createActivity(activity, holidayId), {
    onSuccess: () => {
      // L'invalidation se fait asynchronement mais ne renvoie pas de données, donc pas besoin du .then()
      client.invalidateQueries(holidayKeys.all);
    },
  });
};
