import {useQuery} from "@tanstack/react-query";
import HolidayApi from "../EndPoints/HolidayApi.ts";

export const usetGetParticipants = () => {
  return useQuery({
    queryKey: ['participant'],
    queryFn: () => HolidayApi.getParticipants().then((content) => content.data),
    initialData: [],
  });
};

export const usetGetParticipantsByHoliday = (holidayId : string) => {
  return useQuery({
    queryKey: ['participant'],
    queryFn: () => HolidayApi.getParticipantsByHoliday(holidayId).then((content) => content.data),
    initialData: [],
  });
};
