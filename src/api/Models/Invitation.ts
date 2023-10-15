

export type Invitation = {
  holidayId: string;
  participantId: string;
};

export type InvitationMutation = Omit<Invitation, 'id'>;
