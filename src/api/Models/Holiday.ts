import { LocationMutation, LocationSendFormHoliday } from './Location.ts';
import { Activity } from './Activity.ts';

export type Holiday = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: LocationMutation;
  activities: Activity[];
};

export type HolidaySendForm = {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  location: LocationSendFormHoliday;
};

export type HolidayMutation = Omit<Holiday, 'id'>;
