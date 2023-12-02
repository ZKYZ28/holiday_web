import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {holidayKeys, participantKeys} from '../Querykeys.ts';
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

export const useGetAllHolidayByParticipant = (isPublished: boolean) => {
  return useQuery({
    queryKey: holidayKeys.list(),
    queryFn: () => HolidayRequestsApi.getAllHolidayByParticipant(isPublished).then((content) => content.data),
    initialData: [],
  });
};

export const useGetAllHolidayPublished = (isPublished: boolean) => {
  return useQuery({
    queryKey: holidayKeys.listPublished(),
    queryFn: () => HolidayRequestsApi.getAllHolidayPublished(isPublished).then((content) => content.data),
    initialData: [],
  });
};

export const useGetParticipantsByHoliday = (holidayId: string, isParticipated : boolean) => {
  return useQuery({
    queryKey: participantKeys.queryListByHoliday(holidayId),
    queryFn: () => HolidayRequestsApi.getParticipantsByHoliday(holidayId, isParticipated).then((content) => content.data),
    initialData: [],
  });
};

export const useGetHolidayById = (holidayId: string) => {
  return useQuery({
    queryKey: holidayKeys.get(holidayId),
    queryFn: () => HolidayRequestsApi.getHolidayById(holidayId).then((content) => content.data),
    // initialData: {} as Holiday,
  });
};

export const useLeaveHoliday = () => {
  const client = useQueryClient();
  return useMutation((holidayId: string) => HolidayRequestsApi.leaveHoliday(holidayId), {
    onSuccess: () => {
      client.invalidateQueries(holidayKeys.all);
    },
  });
};

export const useDeleteHoliday = () => {
  const client = useQueryClient();
  return useMutation((holidayId: string) => HolidayRequestsApi.deleteHoliday(holidayId), {
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
