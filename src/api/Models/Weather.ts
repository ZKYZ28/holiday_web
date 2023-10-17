import {WeatherDay} from './WeatherDay.ts';

export type Weather = {
  currentDay: WeatherDay;
  weatherDays: WeatherDay[];
};

// export type WeatherMutation = Omit<Weather, 'id'>;
