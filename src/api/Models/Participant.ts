export type Participant = {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  srcImage: string;
};

export type ParticipantMutation = Omit<Participant, 'id'>;
