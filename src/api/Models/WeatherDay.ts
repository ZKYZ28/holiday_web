import {WeatherCondition} from './WeatherCondition.ts';
import {WeatherHour} from './WeatherHour.ts';

export type WeatherDay = {
  date: string;
  maxTemp: number;
  minTemp: number;
  currentTemp: number;
  riskOfRain: number;
  riskOfSnow: number;
  condition: WeatherCondition;
  weatherByHour: WeatherHour[];
};

