import { ChangeEventHandler } from 'react';

export type TextAreaProps = {
  id: string;
  name: string;
  errorMessage: string;
  label: string;
  onChange: ChangeEventHandler;
  value: string;
};
