import { LocationMutation } from './Location.ts';
import {Activity} from './Activity.ts';

export type Holiday = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: LocationMutation;
  activities: Activity[];
};

export type HolidayMutation = Omit<Holiday, 'id'>;
// Pick<DATA, Props>
