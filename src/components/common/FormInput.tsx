import { ChangeEvent, ChangeEventHandler, FC, useState } from 'react';
import StarsRequired from './StarsRequired.tsx';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

type FormInputProps = {
  value: string | number;
  id: string;
  name: string;
  errorMessage: string;
  label: string;
  required: boolean;
  onChange: ChangeEventHandler;
  placeholder: string;
  type: string;
};

const FormInput: FC<FormInputProps> = ({ id, errorMessage, label, type, ...inputProps }: FormInputProps) => {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setFocused(false);
    setIsValid(e.currentTarget.checkValidity());
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="my-4 relative">
      <label htmlFor={id}>
        {label}
        {inputProps.required && <StarsRequired />}
      </label>
      <div className="flex items-center">
        <input
          {...inputProps}
          type={inputType}
          className={cn(
            'w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline my-1 mr-2 flex-grow',
            { ['border-red-500']: !isValid && focused }
          )}
          id={id}
          onBlur={handleBlur}
          onFocus={() => setFocused(true)}
          data-focused={focused.toString()}
        ></input>
        {type === 'password' && (
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 cursor-pointer"
          />
        )}
      </div>
      {!isValid && <span className="text-red-600">{errorMessage}</span>}
    </div>
  );
};

export default FormInput;
