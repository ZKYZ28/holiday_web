import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import Span from './Span.tsx';
import StarsRequired from './StarsRequired.tsx';
import cn from 'classnames';

type FormInputProps = {
  id: string;
  name: string;
  errorMessage: string;
  label: string;
  onChange: ChangeEventHandler;
  placeholder: string;
};

function FormInput({ id, errorMessage, label, ...inputProps }: FormInputProps) {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setFocused(false);
    setIsValid(e.currentTarget.checkValidity());
  };

  return (
    <div className="my-4">
      <label htmlFor={id}>
        {label}
        <StarsRequired />
      </label>
      <input
        {...inputProps}
        className={cn(
          'w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline my-1',
          { ['border-red-500']: !isValid && focused }
        )}
        id={id}
        onBlur={handleBlur}
        onFocus={() => setFocused(true)}
        data-focused={focused.toString()}
      />
      {!isValid && <Span style="text-red-600" text={errorMessage}></Span>}
    </div>
  );
}

export default FormInput;
