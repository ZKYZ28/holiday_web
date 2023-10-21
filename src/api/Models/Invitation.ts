import { HolidayMutation } from './Holiday.ts';

export type Invitation = {
  Id: string;
  holidayId: string;
  holiday: HolidayMutation;
  participantId: string;
};

export type InvitationMutation = {
  holidayId: string;
  participantId: string;
};
