export type Location = {
  id: string;
  number: number;
  street: string;
  locality: string;
  postalCode: number;
  country: string;
};

export type LocationMutation = Omit<Location, 'id'>;
