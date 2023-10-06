import FormContainer from '../../components/common/FormContainer.tsx';
import FormInput from '../../components/common/FormInput.tsx';
import { ChangeEvent, useState } from 'react';
import TextAreaInput from '../../components/common/TextAreaInput.tsx';
import { useCreateHoliday } from '../../api/Queries/HolidayQueries.ts';
import * as dayjs from 'dayjs';

const EncodeHoliday = () => {
  const { mutate: mutateHoliday } = useCreateHoliday(() => {
    alert('Post succeeded !');
  });

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
    id: 'endDate',
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
    id: 'description',
    name: 'description',
    type: 'message',
    placeholder: 'On va faire de l\'aqua poney, trop bien !',
    errorMessage: '',
    label: 'Description',
    required: false,
  };

  const submitTest = () => {
    const date = dayjs();
    mutateHoliday({
      name: 'EndMove',
      description: 'EndMoveSex',
      startDate: date.format(),
      endDate: date.format(),
    });
  };

  return (
    <FormContainer title="Encoder vacances">
      <form>
        <div className="block lg:flex justify-between w-full">
          <div className="w-full lg:w-2/5">
            <FormInput {...inputName} value={nameInput} onChange={handleChangeName} />
          </div>
          <div className="w-full lg:w-2/5">
            <FormInput {...inputLocation} value={locationInput} onChange={handleChangeLocation} />
          </div>
        </div>

        <div className="block lg:flex justify-between w-full">
          <div className="w-full lg:w-2/5">
            <FormInput {...inputStartDate} value={startDateInput} onChange={handleChangeStartDate} />
          </div>
          <div className="w-full lg:w-2/5">
            <FormInput {...inputEndDate} value={endDateInput} onChange={handleChangeEndDate} />
          </div>
        </div>

        <TextAreaInput {...descriptionTextArea} value={descriptionTextAreaField} onChange={handleChangeDescription} />

        <div className="flex justify-center">
          <button
            type="submit"
            onClick={submitTest}
            className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
          >
            Encoder
          </button>
        </div>
      </form>
    </FormContainer>
  );
};
export default EncodeHoliday;
