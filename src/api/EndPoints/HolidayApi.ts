import axiosInstance from '../axios.ts';
import { Apod, ApodQueryParams } from '../Models/Apod.ts';

class HolidayApi {
  static ENDPOINT: string = ''; // ou /v1 -> pour la versiond e l'api

  static async getHoliday() {
    // pas oublier de typer son Models avec ...get<TYPE>()
    return axiosInstance.get(`${this.ENDPOINT}/apod`);
  }

  static async getHolidayWithParamas() {
    // pas oublier de typer son Models avec ...get<TYPE>()
    return axiosInstance.get(`${this.ENDPOINT}/apod`);
  }
}

export default ApodApi;
