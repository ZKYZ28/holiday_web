import {ChangeEvent, useState} from "react";
import Span from "./Span.tsx";
import StarsRequired from "./StarsRequired.tsx";

function TextAreaInput({styleTextArea, idTextArea, nameTextArea, errorMessage, label, onChange, ...inputProps}) {
    console.log(inputProps)

    const [focused, setFocused] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleBlur = (e:FocusEvent<HTMLTextAreaElement>) => {
        setFocused(false);
        // Fais la validation, comme ceci car il n'y a pas de pattern en HTML standard pour les balises <text area>
        setIsValid(e.currentTarget.value.length >= 10);
    };

    return (
        <div className="textArea">
            <label htmlFor={idTextArea}>{label}<StarsRequired /></label>
            <textarea
                {...inputProps}
                className={`${styleTextArea} ${!isValid && focused ? 'border-red-500' : ''}`}
                id={idTextArea}
                name={nameTextArea}
                onChange={onChange}
                onBlur={handleBlur}
                onFocus={() => setFocused(true)}
                data-focused={focused.toString()}
            />
            {!isValid && <Span style="text-red-600" text={errorMessage}></Span>}
        </div>
    )
}

export default TextAreaInput;