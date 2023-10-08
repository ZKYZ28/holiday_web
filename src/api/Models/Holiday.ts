import {LocationMutation} from "./Location.ts";

export type Holiday = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: LocationMutation;
};

export type HolidayMutation = Omit<Holiday, 'id'>;
// Pick<DATA, Props>
