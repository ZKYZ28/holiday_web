import {Participant} from "./Participant.ts";
import {Activity} from "./Activity.ts";

export type Participate = {
  id: string;
  activityId: string;
  activity: Activity;
  participantId: string;
  participant: Participant;
};

export type ParticipateMutation = Omit<Participant, 'id'>;
