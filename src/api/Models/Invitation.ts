import {Holiday} from './Holiday.ts';
import {Participant} from "./Participant.ts";

export type Invitation = {
  id: string;
  holidayId: string;
  holiday: Holiday;
  participantId: string;
  participant: Participant;
};

export type InvitationMutation = {
  holidayId: string;
  participantId: string;
};

