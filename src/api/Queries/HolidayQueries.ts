import { useMutation, useQuery } from '@tanstack/react-query';
import HolidayApi from '../EndPoints/HolidayApi.ts';
import { Holiday, HolidayMutation } from '../Models/Holiday.ts';
import holidayApi from "../EndPoints/HolidayApi.ts";

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
    queryKey: ['holidays'], // Une clé pour identifier cette requête
    queryFn:  () => holidayApi.getHoliday().then(content =>  content.data),
    initialData: (): { data: Holiday[] } => ({ data: [] }),
  });
};
