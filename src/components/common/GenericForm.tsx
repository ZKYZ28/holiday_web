import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import FormInput from './FormInput.tsx';
import TextAreaInput from './TextAreaInput.tsx';
import { InitialValues, InputType, OnSubmitFunction } from '../../../typing/inputType.ts';
import { TextAreaProps } from '../../../typing/textAreaPropsType.ts';
import UploadFile from './UploadFile.tsx';

function GenericForm({
  fields,
  initialValues,
  descriptionValue,
  onSubmit,
  textAreaProps,
  buttonText,
  error,
  picturePath,
}: {
  fields: InputType[];
  initialValues: object;
  descriptionValue: string;
  onSubmit: OnSubmitFunction;
  textAreaProps: TextAreaProps;
  buttonText: string;
  error: string;
  picturePath: string;
}) {
  const [valueInputs, setValueInputs] = useState(initialValues);
  const [description, setDescription] = useState(descriptionValue);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [deleteImage, setDeleteImage] = useState<boolean>(false);

  useEffect(() => {
    setValueInputs(initialValues);
  }, [initialValues]);

  useEffect(() => {
    setDescription(descriptionValue);
  }, [descriptionValue]);

  const handleFileSelect = (file: File | null, deleteImage: boolean = false) => {
    setSelectedFile(file);
    setDeleteImage(deleteImage);
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValueInputs({ ...valueInputs, [evt.target.name]: evt.target.value });
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Récupérer les valeurs des inputs + le text area
    const allValues: InitialValues = {
      ...valueInputs,
      description,
      file: selectedFile,
      deleteImage: deleteImage,
    };
    onSubmit(allValues);
  };
  return (
    <form onSubmit={handleSubmit}>
      <UploadFile onFileSelected={handleFileSelect} initialPicturePath={picturePath} />
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

      <div className="flex flex-col items-center">
        {error && <span className="font-bold text-red-600 mb-2">{error}</span>}
        <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default GenericForm;
