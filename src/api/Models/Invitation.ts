import {HolidayMutation} from "./Holiday.ts";

export type Invitation = {
  invitationId: string;
  holidayId: string;
  holiday: HolidayMutation;
  participantId: string;
};

export type InvitationMutation = Omit<Invitation, 'id'>;
