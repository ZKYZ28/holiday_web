import { LocationMutation } from './Location.ts';
import {Activity} from './Activity.ts';
import {Participant} from "./Participant.ts";

export type Holiday = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: LocationMutation;
  participant: Participant;
  isPublish: boolean;
  activities: Activity[];
};

export type HolidayMutation = Omit<Holiday, 'id'>;
