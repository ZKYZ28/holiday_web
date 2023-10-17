import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HolidayMutation } from '../Models/Holiday.ts';
import { holidayKeys } from '../Querykeys.ts';
import HolidayRequestsApi from '../EndPoints/Requests/HolidayRequestsApi.ts';

export const useCreateHoliday = () => {
  const client = useQueryClient();
  return useMutation((holiday: HolidayMutation) => HolidayRequestsApi.createHoliday(holiday), {
    onSuccess: () => {
      client.invalidateQueries(holidayKeys.all);
    },
  });
};

export const useGetAllHoliday = () => {
  return useQuery({
    queryKey: holidayKeys.list(),
    queryFn: () => HolidayRequestsApi.getAllHoliday().then((content) => content.data),
    initialData: [],
  });
};

export const useGetHolidayById = (holidayId: string) => {
  return useQuery(
    holidayKeys.all,
    () => HolidayRequestsApi.getHolidayById(holidayId).then((content) => content.data),
    {}
  );
};
// TODO : mieux la version du dessus ou du dessous ?
// export const useGetHolidayById = (holidayId: string) => {
//   return useQuery({
//     queryKey:  holidayKeys.all ,
//     queryFn: () => HolidayRequestsApi.getHolidayById(holidayId).then((content) => content.data),
//     initialData: {},
//   });
// };


