import {useQuery} from "@tanstack/react-query";
import HolidayApi from "../EndPoints/HolidayApi.ts";

export const usetGetParticipants = (holidayId : string) => {
  return useQuery({
    queryKey: ['participant'],
    queryFn: () => HolidayApi.getParticipants(holidayId).then((content) => content.data),
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


export const usetGetParticipantsCount = () => {
  return useQuery({
    queryKey: ['participant'],
    queryFn: () => HolidayApi.getParticipantCount().then((content) => content.data),
    initialData: 0,
  });
};
