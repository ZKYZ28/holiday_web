import {useQuery} from "@tanstack/react-query";
import HolidayApi from "../EndPoints/HolidayApi.ts";

export const usetGetWeather = (id : string) => {
  return useQuery({
    queryKey: ['weather'],
    queryFn: () => HolidayApi.getWeather(id).then((content) => content.data),
    initialData: {},
  });
};
