//import { ChangeEventHandler } from 'react';

import {ChangeEventHandler} from "react";

export type TextAreaProps = {
  id: string;
  name: string;
  type: string;
  errorMessage: string;
  placeholder: string;
  label: string;
  onChangeDescritpion: ChangeEventHandler;
  value: string;
};
