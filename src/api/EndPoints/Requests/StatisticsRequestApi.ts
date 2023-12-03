import axiosInstance from '../../axios.ts';
import CONFIGURATION from '../Configuration.ts';
import { Statistics } from '../../Models/Statistics.ts';

class StatisticsRequestApi {
  static async getStatistics() {
    return axiosInstance.get<Statistics>(`${CONFIGURATION.API_ENDPOINT}/statistics`);
  }

  static async getStatisticsForDate(date: string) {
    return axiosInstance.get<Statistics[]>(`${CONFIGURATION.API_ENDPOINT}/statistics/date/${date}`);
  }
}

export default StatisticsRequestApi;
