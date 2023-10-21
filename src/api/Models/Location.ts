export type Location = {
  id: string;
  number: number;
  street: string;
  locality: string;
  postalCode: number;
  country: string;
};

export type LocationSendFormActivity = {
  number?: string;
  street?: string;
  locality?: string;
  postalCode?: string;
  country?: string;
};

export type LocationSendFormHoliday = {
  number?: string;
  street?: string;
  locality: string;
  postalCode: string;
  country: string;
};

export type LocationMutation = Omit<Location, 'id'>;
