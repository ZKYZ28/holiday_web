import React, { ChangeEvent, useState } from 'react';
import FormInput from './FormInput.tsx';
import TextAreaInput from './TextAreaInput.tsx';

function GenericForm({ fields, initalValues, onSubmit, textAreaProps, buttonText }) {
  const [valueInputs, setValueInputs] = useState(initalValues);
  const [description, setDescription] = useState('');

  const onChange = (evt) => {
    setValueInputs({ ...valueInputs, [evt.target.name]: evt.target.value });
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Récupérer les valeurs des inputs + le text area
    const allValues = {
      ...valueInputs,
      description,
    };
    onSubmit(allValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(
        (input, index) =>
          index % 2 === 0 && (
            <div key={input.id} className="block lg:flex justify-between w-full">
              <div className="w-full lg:w-2/5">
                <FormInput {...input} value={valueInputs[input.name]} onChange={onChange} />
              </div>
              {fields[index + 1] && (
                <div className="w-full lg:w-2/5">
                  <FormInput {...fields[index + 1]} value={valueInputs[fields[index + 1].name]} onChange={onChange} />
                </div>
              )}
            </div>
          )
      )}
      {textAreaProps && <TextAreaInput {...textAreaProps} value={description} onChange={handleChangeDescription} />}

      <div className="flex justify-center">
        <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default GenericForm;
