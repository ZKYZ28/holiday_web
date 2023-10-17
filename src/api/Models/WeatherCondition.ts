export type WeatherCondition = {
  description: string;
  iconPath: string;
};

export type WeatherConditionMutation = Omit<WeatherCondition, 'id'>;
