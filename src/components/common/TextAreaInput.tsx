import React, { useState } from 'react';
import StarsRequired from './StarsRequired.tsx';
import { TextAreaProps } from '../../../typing/textAreaPropsType.ts';

function TextAreaInput({ id, name, errorMessage, label, onChange, placeholder, value, required, isOptional = true }: TextAreaProps) {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);
    // Fais la validation, comme ceci car il n'y a pas de pattern en HTML standard pour les balises <text area>
    const regex = isOptional
      ? /^[A-Za-z\dÀ-ÿ\s,.!?;:\"\(\)<>\-\+\&\'@\[\]\#\{\}\~\$\%\ù\çÇ\=\*]{0,500}$/
      : /^[A-Za-z\dÀ-ÿ\s,.!?;:\"\(\)<>\-\+\&\'@\[\]\#\{\}\~\$\%\ù\çÇ\=\*]{0,1500}$/;

    const isValid = isOptional
      ? e.currentTarget.value === '' || e.currentTarget.value === null || regex.test(e.currentTarget.value)
      : regex.test(e.currentTarget.value) && e.currentTarget.value.length > 4;

    setIsValid(isValid);
  };

  return (
    <div className="textArea">
      <label htmlFor={id}>
        {label}
        {required && <StarsRequired />}
      </label>
      <textarea
        className={`my-4 w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
          !isValid && focused ? 'border-red-500' : ''
        }`}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={handleBlur}
        onFocus={() => setFocused(true)}
        data-focused={focused.toString()}
      />
      {!isValid && <span className="text-red-600">{errorMessage}</span>}
    </div>
  );
}

export default TextAreaInput;
