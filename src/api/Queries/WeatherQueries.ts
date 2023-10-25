import { useQuery } from '@tanstack/react-query';
import WeatherRequetsApi from '../EndPoints/Requests/WeatherRequetsApi.ts';
import { weatherKeys } from '../Querykeys.ts';

export const usetGetWeather = (id: string) => {
  return useQuery({
    queryKey: weatherKeys.all,
    queryFn: () => WeatherRequetsApi.getWeather(id).then((content) => content.data),
    // initialData: {},
  });
};
