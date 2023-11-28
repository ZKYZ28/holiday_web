export type Location = {
  id: string;
  number: string | null;
  street: string | null;
  locality: string;
  postalCode: string;
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
