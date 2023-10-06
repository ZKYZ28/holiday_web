export type Holiday = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};

export type HolidayMutation = Omit<Holiday, 'id'>;
// Pick<DATA, Props>
