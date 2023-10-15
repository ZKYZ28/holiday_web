import {WeatherDayMutation} from "./WeatherDay.ts";

export type Weather = {
  currentDay: WeatherDayMutation;
  weatherDays: WeatherDayMutation[];
};

export type WeatherMutation = Omit<Weather, 'id'>;
// Pick<DATA, Props>
