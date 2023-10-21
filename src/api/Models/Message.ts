import {Holiday} from "./Holiday.ts";
import {Participant} from "./Participant.ts";

export type Message = {
    sendAt: string,
    content: string,
    holiday: Holiday,
    holidayId: string,
    participant: Participant,
    participantId: string,
};

