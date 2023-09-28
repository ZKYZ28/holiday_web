import {ChangeEvent, useState} from "react";
import Span from "./Span.tsx";
import StarsRequired from "./StarsRequired.tsx";

function FormInput({styleInput, idInput, nameInput, errorMessage, label, onChange, ...inputProps}) {

    const [focused, setFocused] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleBlur = (e:ChangeEvent<HTMLInputElement>) => {
        setFocused(false);
        setIsValid(e.currentTarget.checkValidity());
    };

    return (
        <div className="formInput">
            <label htmlFor={idInput}>{label}<StarsRequired /></label>
            <input
                {...inputProps}
                className={`${styleInput} ${!isValid && focused ? 'border-red-500' : ''}`}
                id={idInput}
                name={nameInput}
                onChange={onChange}
                onBlur={handleBlur}
                onFocus={() => setFocused(true)}
                data-focused={focused.toString()}
            />
            {!isValid && <Span style="text-red-600" text={errorMessage}></Span>}
        </div>
    )
}

export default FormInput;