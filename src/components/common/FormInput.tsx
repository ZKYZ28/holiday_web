import { ChangeEvent, useState } from 'react';
import Span from './Span.tsx';
import StarsRequired from './StarsRequired.tsx';
import cn from 'classnames';

function FormInput({ styleInput, idInput, nameInput, errorMessage, label, onChange, ...inputProps }) {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setFocused(false);
    setIsValid(e.currentTarget.checkValidity());
  };

  return (
    <div>
      <label htmlFor={idInput}>
        {label}
        <StarsRequired />
      </label>
      <input
        {...inputProps}
        className={cn(styleInput, { ['border-red-500']: !isValid && focused })}
        id={idInput}
        name={nameInput}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={() => setFocused(true)}
        data-focused={focused.toString()}
      />
      {!isValid && <Span style="text-red-600" text={errorMessage}></Span>}
    </div>
  );
}

export default FormInput;
