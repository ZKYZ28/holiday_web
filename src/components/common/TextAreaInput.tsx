import {useState} from "react";
import Span from "./Span.tsx";

function TextAreaInput({styleTextArea, idTextArea, nameTextArea, errorMessage, textLabel, onChange, ...inputProps}) {

    const [focused, setFocused] = useState(false);

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className="textArea">
            <label htmlFor={idTextArea}>{textLabel}</label>
            <textarea
                {...inputProps}
                className={styleTextArea}
                id={idTextArea}
                name={nameTextArea}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                focused={focused.toString()}
            />
            <Span style="text-red-600" text={errorMessage}></Span>
        </div>
    )
}

export default TextAreaInput;