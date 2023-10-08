import FormContainer from '../../components/common/FormContainer.tsx';
import FormInput from '../../components/common/FormInput.tsx';
import { ChangeEvent, FormEvent, useState } from 'react';
import TextAreaInput from '../../components/common/TextAreaInput.tsx';
import { useCreateHoliday } from '../../api/Queries/HolidayQueries.ts';
import * as dayjs from 'dayjs';
import PageWrapper from '../../components/common/PageWrapper.tsx';

const inputsHoliday = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'Vacances 2023-2024',
    errorMessage: 'Ça doit être un nom valide !',
    label: 'Nom :',
    required: true,
  },
  {
    id: 'country',
    name: 'country',
    type: 'text',
    placeholder: 'Pays',
    errorMessage: 'Belgique',
    label: 'Pays :',
    required: true,
  },
  {
    id: 'number',
    name: 'number',
    type: 'number',
    placeholder: '77',
    errorMessage: 'Le numéro de la boite doit être nombre compris entre 0 et 25000 !',
    label: 'Numéro de boite :',
    required: true,
  },
  {
    id: 'street',
    name: 'street',
    type: 'text',
    placeholder: 'Rue du port',
    errorMessage: 'Merci de saisir entre 0 à 100 caractères !',
    label: 'Rue :',
    required: true,
  },
  {
    id: 'postalCode',
    name: 'postalCode',
    type: 'number',
    placeholder: '4000',
    errorMessage: 'Merci d\'indiquer un code postal entre 1 à 6 chiffres',
    label: 'Code postal :',
    required: true,
  },
  {
    id: 'locality',
    name: 'locality',
    type: 'text',
    placeholder: 'Liège',
    errorMessage: 'Le numéro de la boite doit être nombre compris entre 0 et 25000 !',
    label: 'Lieu :',
    required: true,
  },
  {
    id: 'startDate',
    name: 'startDate',
    type: 'date',
    placeholder: 'Date de début',
    errorMessage: '04/10/2023',
    label: 'Date de début :',
    required: true,
  },
  {
    id: 'endDate',
    name: 'endDate',
    type: 'date',
    placeholder: 'Date de fin',
    errorMessage: '6/10/2023',
    label: 'Date de fin :',
    required: true,
  },
];

const descriptionTextArea = {
  id: 'description',
  name: 'description',
  type: 'message',
  placeholder: 'On va faire de l\'aqua poney, trop bien !',
  errorMessage: '',
  label: 'Description',
  required: false,
};

const EncodeHoliday = () => {
  const { mutate: mutateHoliday } = useCreateHoliday();

  const [valueInputs, setValueInputs] = useState({
    name: '',
    country: '',
    number: '',
    street: '',
    postalCode: '',
    locality: '',
    startDate: '',
    endDate: '',
  });

  const [descriptionTextAreaField, setDescriptionAreaField] = useState('');

  const onChange = (evt) => {
    setValueInputs({ ...valueInputs, [evt.target.name]: evt.target.value });
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionAreaField(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    console.log(e.target);
    mutateHoliday(
      {
        name: data.get('name') as string,
        description: data.get('description') as string,
        startDate: dayjs(data.get('startDate') as string).format(),
        endDate: dayjs(data.get('endDate') as string).format(),
        location: {
          street: data.get('street') as string,
          number: data.get('number'),
          locality: data.get('locality'),
          postalCode: data.get('postalCode'),
          country: data.get('country'),
        },
      },
      { onError: () => alert('An error occurred'), onSuccess: () => alert('Success') }
    );
  };

  return (
    <PageWrapper>
      <FormContainer title="Encoder vacances">
        <form onSubmit={handleSubmit}>
          {inputsHoliday.map(
            (input, index) =>
              index % 2 === 0 && (
                <div key={input.id} className="block lg:flex justify-between w-full">
                  <div className="w-full lg:w-2/5">
                    <FormInput {...input} value={valueInputs[input.name]} onChange={onChange} />
                  </div>
                  {inputsHoliday[index + 1] && (
                    <div className="w-full lg:w-2/5">
                      <FormInput
                        {...inputsHoliday[index + 1]}
                        value={valueInputs[inputsHoliday[index + 1].name]}
                        onChange={onChange}
                      />
                    </div>
                  )}
                </div>
              )
          )}

          <TextAreaInput {...descriptionTextArea} value={descriptionTextAreaField} onChange={handleChangeDescription} />

          <div className="flex justify-center">
            <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">
              Encoder
            </button>
          </div>
        </form>
      </FormContainer>
    </PageWrapper>
  );
};
export default EncodeHoliday;
