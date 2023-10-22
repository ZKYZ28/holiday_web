export type InputType = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  errorMessage: string;
  label: string;
  required: boolean;
  pattern?: string;
};

export type InitialValues = {
  name: string;
  country?: string;
  number?: string;
  street?: string;
  postalCode?: string;
  locality?: string;
  startDate: string;
  endDate: string;
  description?: string;
  price?: number;
  file: File | null;
};

export type OnSubmitFunction = (values: InitialValues) => void;
