import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import StatisticsRequestApi from "../EndPoints/Requests/StatisticsRequestApi.ts";
import {statisticsKey} from "../Querykeys.ts";

export const useGetStatistics = () => {
  return useQuery({
    queryKey: statisticsKey.all,
    queryFn: () => StatisticsRequestApi.getStatistics().then((content) => content.data)
  });
};

export const useGetStatisticsForDate = () => {
  const client = useQueryClient();
  return useMutation(
    (date: string) => StatisticsRequestApi.getStatisticsForDate(date).then((content) => content.data),
    {
      onSuccess: () => {
        client.invalidateQueries(statisticsKey.all);
      },
    }
  );
};
