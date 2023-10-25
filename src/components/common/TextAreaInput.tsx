import React, { useState } from 'react';
import StarsRequired from './StarsRequired.tsx';
import { TextAreaProps } from '../../../typing/textAreaPropsType.ts';

function TextAreaInput({ id, name, errorMessage, label, onChangeDescritpion, ...inputProps }: TextAreaProps) {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);
    // Fais la validation, comme ceci car il n'y a pas de pattern en HTML standard pour les balises <text area>
    setIsValid(e.currentTarget.value.length >= 10);
  };

  return (
    <div className="textArea">
      <label htmlFor={id}>
        {label}
        <StarsRequired />
      </label>
      <textarea
        {...inputProps}
        className={`my-4 w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
          !isValid && focused ? 'border-red-500' : ''
        }`}
        id={id}
        name={name}
        onChange={onChangeDescritpion}
        onBlur={handleBlur}
        onFocus={() => setFocused(true)}
        data-focused={focused.toString()}
      />
      {!isValid && <span className="text-red-600">{errorMessage}</span>}
    </div>
  );
}

export default TextAreaInput;
