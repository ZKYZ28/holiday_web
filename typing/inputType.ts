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
  [key: string]: string | number | boolean;
};

export type OnSubmitFunction = (values: InitialValues) => void;
