// WEATHER
import axiosInstance from '../../axios.ts';
import { Weather } from '../../Models/Weather.ts';
import { ENDPOINT } from '../EndPointApi.ts';

class WeatherRequetsApi {
  static async getWeather(holidayId: string) {
    return axiosInstance.get<Weather>(`${ENDPOINT}/weather/${holidayId}`);
  }
}

export default WeatherRequetsApi;
