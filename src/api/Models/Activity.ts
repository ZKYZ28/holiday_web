import {LocationMutation, LocationSendFormActivity} from './Location.ts';

export type Activity = {
  id: string;
  name: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  location: LocationMutation;
  activityPath: string;
};

export type ActivitySendForm = {
  name: string;
  description?: string;
  price?: number;
  startDate?: string;
  endDate?: string;
  location?: LocationSendFormActivity;
};

export type ActivityMutation = Omit<Activity, 'id'>;
