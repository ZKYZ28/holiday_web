import {WeatherDay} from './WeatherDay.ts';

export type Weather = {
  currentDay: WeatherDay;
  weatherDays: WeatherDay[];
};

