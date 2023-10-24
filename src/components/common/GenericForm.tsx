import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from './FormInput.tsx';
import TextAreaInput from './TextAreaInput.tsx';
import { InputType, OnSubmitFunction } from '../../../typing/inputType.ts';
import { TextAreaProps } from '../../../typing/textAreaPropsType.ts';
import UploadFile, { FileWithAction } from './UploadFile.tsx';
import { Holiday } from '../../api/Models/Holiday.ts';
import { Activity } from '../../api/Models/Activity.ts';
import { MODELS } from '../../api/Models/Enums/ModelsEnum.ts';

function GenericForm({
  fields,
  initialValues,
  onSubmit,
  textAreaProps,
  buttonText,
  error,
  modelType,
}: {
  fields: InputType[];
  initialValues: object;
  onSubmit: OnSubmitFunction;
  textAreaProps: TextAreaProps;
  buttonText: string;
  error: string;
  modelType: string;
}) {
  const [valueInputs, setValueInputs] = useState<Holiday | Activity>(initialValues);
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<FileWithAction | null>(null);

  const handleFileSelect = (file: FileWithAction) => {
    console.log(file);
    setSelectedFile({ ...file });
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
    const allValues: { description: string } = {
      ...valueInputs,
      description,
      file: selectedFile,
    };
    onSubmit(allValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <UploadFile
        onFileSelected={handleFileSelect}
        initialPicturePath={modelType === MODELS.Holiday ? valueInputs.holidayPath : valueInputs.activityPath}
      />
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
