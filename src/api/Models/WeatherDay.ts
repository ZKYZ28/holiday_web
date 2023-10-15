import {WeatherConditionMutation} from "./WeatherCondition.ts";
import {WeatherHourMutation} from "./WeatherHour.ts";

export type WeatherDay = {
  date: string;
  maxTemp: number;
  minTemp: number;
  currentTemp: number;
  riskOfRain: number;
  riskOfSnow: number;
  condition: WeatherConditionMutation[];
  weatherByHour : WeatherHourMutation[];
};

export type WeatherDayMutation = Omit<WeatherDay, 'id'>;
// Pick<DATA, Props>
