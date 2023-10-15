import { LocationMutation } from './Location.ts';

export type Activity = {
  id: string;
  name: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  location: LocationMutation;
};

export type ActivityMutation = Omit<Activity, 'id'>;
