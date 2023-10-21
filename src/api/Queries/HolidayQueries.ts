import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {HolidayMutation, HolidaySendForm} from '../Models/Holiday.ts';
import { holidayKeys } from '../Querykeys.ts';
import HolidayRequestsApi from '../EndPoints/Requests/HolidayRequestsApi.ts';

export const useCreateHoliday = () => {
  const client = useQueryClient();
  return useMutation((holiday: HolidaySendForm) => HolidayRequestsApi.createHoliday(holiday), {
    onSuccess: () => {
      client.invalidateQueries(holidayKeys.all);
    },
  });
};

export const useGetAllHoliday = (participantId: string) => {
  return useQuery({
    queryKey: holidayKeys.list(),
    queryFn: () => HolidayRequestsApi.getAllHoliday(participantId).then((content) => content.data),
    initialData: [],
  });
};

export const useGetHolidayById = (holidayId: string) => {
  return useQuery({
    queryKey: holidayKeys.all,
    queryFn: () => HolidayRequestsApi.getHolidayById(holidayId).then((content) => content.data),
    initialData: {},
  });
};
// TODO : mieux la version du dessus ou du dessous ?
// export const useGetHolidayById = (holidayId: string) => {
//   return useQuery({
//     queryKey:  holidayKeys.all ,
//     queryFn: () => HolidayRequestsApi.getHolidayById(holidayId).then((content) => content.data),
//     initialData: {},
//   });
// };

export const useGetAllHolidayCountForDate = (date: string) => {
  return useQuery({
    queryKey: ['holiday'],
    queryFn: () => HolidayRequestsApi.getAllHolidayCountForDate(date).then((content) => content.data),
    initialData: 0,
  });
};
