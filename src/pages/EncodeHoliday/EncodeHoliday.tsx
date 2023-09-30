import FormContainer from '../../components/common/FormContainer.tsx';
import FormInput from '../../components/common/FormInput.tsx';
import { ChangeEvent, useState } from 'react';
import ButtonForm from '../../components/common/ButtonForm.tsx';
import TextAreaInput from '../../components/common/TextAreaInput.tsx';

const EncodeHoliday = () => {
  // NOM
  const [nameInput, setNameInput] = useState('');
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  };
  const inputName = {
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'Vacances 2023-2024',
    errorMessage: 'Ça doit être un nom valide !',
    label: 'Nom :',
    required: true,
  };

  // LOCATION
  const [locationInput, setLocationInput] = useState('');
  const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationInput(e.target.value);
  };
  const inputLocation = {
    id: 'location',
    name: 'location',
    type: 'text',
    placeholder: 'Monaco',
    errorMessage: 'Ça doit être un lieu valide !',
    label: 'Lieu :',
    required: true,
  };

  // START DATE
  const [startDateInput, setStartDateInput] = useState('');
  const handleChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDateInput(e.target.value);
  };
  const inputStartDate = {
    id: 'startDate',
    name: 'startDate',
    type: 'date',
    placeholder: '',
    errorMessage: 'Ça doit être une date valide !',
    label: 'Date de début :',
    required: true,
  };

  // END DATE
  const [endDateInput, setEndDateInput] = useState('');
  const handleChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDateInput(e.target.value);
  };
  const inputEndDate = {
    id : 'endDate',
    name: 'endDate',
    type: 'date',
    placeholder: '',
    errorMessage: 'Ça doit être une date valide !',
    label: 'Date de fin :',
    required: true,
  };

  // DESCRIPTION
  const [descriptionTextAreaField, setDescriptionAreaField] = useState('');

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionAreaField(e.target.value);
  };

  const descriptionTextArea = {
    id : 'description',
    name: 'description',
    type: 'message',
    placeholder: 'On va faire de l\'aqua poney, trop bien !',
    errorMessage: '',
    label: 'Description',
    required: false,
  };

  return (
    <FormContainer title="Encoder vacances">
      <form>
        <div className="block lg:flex justify-between w-full">
          <div className="w-full lg:w-2/5">
            <FormInput
              {...inputName}
              value={nameInput}
              onChange={handleChangeName}
            />
          </div>
          <div className="w-full lg:w-2/5">
            <FormInput
              {...inputLocation}
              value={locationInput}
              onChange={handleChangeLocation}
            />
          </div>
        </div>

        <div className="block lg:flex justify-between w-full">
          <div className="w-full lg:w-2/5">
            <FormInput
              {...inputStartDate}
              value={startDateInput}
              onChange={handleChangeStartDate}
            />
          </div>
          <div className="w-full lg:w-2/5">
            <FormInput
              {...inputEndDate}
              value={endDateInput}
              onChange={handleChangeEndDate}
            />
          </div>
        </div>

        <TextAreaInput {...descriptionTextArea} value={descriptionTextAreaField} onChange={handleChangeDescription} />

        <div className="flex justify-center">
          <ButtonForm text="Encoder" />
        </div>
      </form>
    </FormContainer>
  );
};
export default EncodeHoliday;
