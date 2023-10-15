export type Participant = {
  id: string;
  lastName: string;
  firstName: string;
  email: number;
  passwordHash: string;
};

export type ParticipantMutation = Omit<Participant, 'id'>;
