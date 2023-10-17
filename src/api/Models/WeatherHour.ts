export type WeatherHour = {
  dateAndTime: string;
  temp: number;
  pathImage: string;
};

export type WeatherHourMutation = Omit<WeatherHour, 'id'>;
