import { useMutation, useQuery } from '@tanstack/react-query';
import HolidayApi from '../EndPoints/HolidayApi.ts';
import { Holiday, HolidayMutation } from '../Models/Holiday.ts';

export const useCreateHoliday = (onSuccess?: () => void) => {
  // const client = useQueryClient();
  return useMutation((holiday: HolidayMutation) => HolidayApi.createHoliday(holiday), {
    onSuccess: () => {
      // client.invalidateQueries(newsKeys.list());
      onSuccess?.();
    },
  });
};

export const useGetAllHoliday = () => {
  return useQuery({
    // queryKey: newsKeys.list(), TODO set query and invalidate it in useMutation
    queryFn: () => HolidayApi.getHoliday(),
    select: (response) => response.data,
    initialData: (): { data: Holiday[] } => ({ data: [] }),
  });
};
