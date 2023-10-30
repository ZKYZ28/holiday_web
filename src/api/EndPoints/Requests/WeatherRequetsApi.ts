// WEATHER
import axiosInstance from '../../axios.ts';
import { Weather } from '../../Models/Weather.ts';
import CONFIGURATION from '../Configuration.ts';

class WeatherRequetsApi {
  static async getWeather(holidayId: string) {
    return axiosInstance.get<Weather>(`${CONFIGURATION.API_ENDPOINT}/weather/${holidayId}`);
  }
}

export default WeatherRequetsApi;
