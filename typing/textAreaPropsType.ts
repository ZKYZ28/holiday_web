import { ChangeEventHandler } from 'react';

export type TextAreaProps = {
  id: string;
  name: string;
  errorMessage: string;
  required: boolean;
  placeholder: string;
  isOptional: boolean;
  label: string;
  onChange?: ChangeEventHandler;
  value?: string;
};
