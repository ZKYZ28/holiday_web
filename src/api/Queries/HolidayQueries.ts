import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Holiday, HolidaySendForm } from '../Models/Holiday.ts';
import { holidayKeys } from '../Querykeys.ts';
import HolidayRequestsApi from '../EndPoints/Requests/HolidayRequestsApi.ts';

export const useCreateHoliday = () => {
  const client = useQueryClient();
  return useMutation((holiday: FormData) => HolidayRequestsApi.createHoliday(holiday), {
    onSuccess: () => {
      client.invalidateQueries(holidayKeys.all);
    },
  });
};

export const useUpdateHoliday = () => {
  const client = useQueryClient();
  return useMutation(
    (data: { holidayId: string; updatedHoliday: FormData }) =>
      HolidayRequestsApi.updateHoliday(data.holidayId, data.updatedHoliday),
    {
      onSuccess: () => {
        client.invalidateQueries(holidayKeys.all);
      },
    }
  );
};

export const usePublishHoliday = () => {
  const client = useQueryClient();
  return useMutation((holiday: Holiday) => HolidayRequestsApi.publishHoliday(holiday), {
    onSuccess: () => {
      client.invalidateQueries(holidayKeys.all);
    },
  });
};

export const useGetAllHolidayByParticipant = (participantId: string) => {
  return useQuery({
    queryKey: [...holidayKeys.list(), participantId],
    queryFn: () => HolidayRequestsApi.getAllHolidayByParticipant(participantId).then((content) => content.data),
    initialData: [],
  });
};

export const useGetAllHolidayPublished = () => {
  return useQuery({
    queryKey: holidayKeys.list(),
    queryFn: () => HolidayRequestsApi.getAllHolidayPublished().then((content) => content.data),
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
    queryKey: holidayKeys.all,
    queryFn: () => HolidayRequestsApi.getAllHolidayCountForDate(date).then((content) => content.data),
    initialData: 0,
  });
};

export const useDeleteHoliday = () => {
  const client = useQueryClient();
  return useMutation((holiday: Holiday) => HolidayRequestsApi.deleteHoliday(holiday), {
    onSuccess: () => {
      client.invalidateQueries(holidayKeys.all);
    },
  });
};

export const useGetExportHoliday = (holidayId: string) => {
  return useMutation({
    mutationFn: () =>
      HolidayRequestsApi.getExportHoliday(holidayId).then((content) => {
        const href = URL.createObjectURL(content.data);

        const link = document.createElement('a');
        link.href = href;
        link.setAttribute('download', 'myHoliday.ics');
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      }),
  });
};
