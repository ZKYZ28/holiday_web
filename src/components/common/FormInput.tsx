import {useState} from "react";
import Span from "./Span.tsx";

function FormInput({styleInput, idInput, nameInput, errorMessage, label, onChange, ...inputProps}) {

    const [focused, setFocused] = useState(false);

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="formInput">
            <label htmlFor={idInput}>{label}</label>
            <input
                {...inputProps}
                className={styleInput}
                id={idInput}
                name={nameInput}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() => setFocused(true)}
                focused={focused.toString()}
            />
            <Span style="text-red-600" text={errorMessage}></Span>
        </div>
    )
}

export default FormInput;