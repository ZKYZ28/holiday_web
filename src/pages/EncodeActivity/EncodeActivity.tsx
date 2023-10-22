import FormContainer from '../../components/common/FormContainer.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import GenericForm from '../../components/common/GenericForm.tsx';
import * as dayjs from 'dayjs';
import { useCreateActivity } from '../../api/Queries/ActivityQueries.ts';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { InitialValues } from '../../../typing/inputType.ts';
import { validateDatesWithoutHour } from '../../validators/dateValidator.ts';
import { useState } from 'react';
import {formattedDate} from "../../components/common/utils/dateUtils.ts";

const inputsActivity = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'Drift',
    errorMessage:
      'Le nom doit contenir entre 3 et 50 caractères et peut inclure des lettres, des chiffres, des apostrophes, des tirets et des espaces.',
    label: 'Nom :',
    pattern: '^[A-Za-z0-9À-ÿ\\s\'\\-]{3,50}$',
    required: true,
  },
  {
    id: 'country',
    name: 'country',
    type: 'text',
    placeholder: 'Pays',
    errorMessage:
      'Veuillez entrer un nom de pays valide entre 3 et 50 caractères. Les lettres, chiffres, apostrophes, tirets et espaces sont autorisés.',
    pattern: '^[A-Za-z0-9À-ÿ\\s\'\\-]{3,50}$',
    label: 'Pays :',
    required: true,
  },
  {
    id: 'number',
    name: 'number',
    type: 'number',
    placeholder: '77',
    errorMessage: 'Veuillez entrer un numéro de boîte valide. Exemples : 77, 77A, PO Box 123, PMB 456B.',
    pattern: '^(PO\\s?Box|PMB|BP)?\\s?\\d{1,6}([A-Za-z\\s\\-]{0,5})?$',
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
    errorMessage:
      'Veuillez saisir un code postal valide. Exemples : 4000 (Belgique), 75000 (France), 90210 (USA), K8N 5W6 (Canada).',
    pattern: '^(?:\\d{4}|\\d{5}(-\\d{4})?|[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d|[A-Za-z]{2}\\d{2,4}[A-Za-z]{0,2})$',
    label: 'Code postal :',
    required: true,
  },
  {
    id: 'locality',
    name: 'locality',
    type: 'text',
    placeholder: 'Liège',
    errorMessage:
      'Veuillez saisir une localité valide contenant entre 1 et 100 caractères. Seules les lettres, espaces, apostrophes, tirets et points sont autorisés.',
    pattern: '^[A-Za-zÀ-ÿ0-9\\s\'\\.,\\/\\-]{1,100}$',
    label: 'Lieu :',
    required: true,
  },
  {
    id: 'startDate',
    name: 'startDate',
    type: 'datetime-local',
    placeholder: '',
    errorMessage:
      'La date de début doit respecter le format de valide comme JJ/MM/YYYY HH:mm (20/10/2023 20:00) ou YYYY/MM/DD HH:mm (2023/10/23 20:30)',
    label: 'Date de début :',
    required: true,
  },
  {
    id: 'endDate',
    name: 'endDate',
    type: 'datetime-local',
    placeholder: '',
    errorMessage:
      'La date de fin doit respecter le format de valide comme JJ/MM/YYYY HH:mm (23/10/2023 20:00) ou YYYY/MM/DD HH:mm (2023/10/23 20:30)',
    label: 'Date de fin :',
    required: true,
  },
  {
    id: 'price',
    name: 'price',
    type: 'number',
    placeholder: '',
    min: 0,
    step: 0.01,
    pattern: '^\\d+(\\.\\d{1,2})?$\n',
    errorMessage: 'Ça doit être un nombre valide !',
    label: 'Prix :',
    required: true,
  },
];

const descriptionTextArea = {
  id: 'description',
  name: 'description',
  type: 'message',
  placeholder: 'On va faire de l\'aqua poney, trop bien !',
  errorMessage: 'Veuillez saisir un message d\'au moins 10 caractères',
  label: 'Description',
  required: false,
};

const EncodeActivity = () => {
  const { id } = useParams();
  // TODO : id! ou id ?? ''
  const { mutate: mutateActivity } = useCreateActivity(id!);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    description: '',
    country: '',
    number: '',
    street: '',
    postalCode: '',
    locality: '',
    price: '',
    startDate: formattedDate(false, true),
    endDate: formattedDate(true, true),
  };

  const handleSubmit = (values: InitialValues) => {
    const { name, description, country, number, street, postalCode, locality, startDate, endDate, price, file } = values;

    const datesValid = validateDatesWithoutHour(startDate as string, endDate as string, true);
    if (datesValid) {
      setError(datesValid);
      return;
    }
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description ?? '');
    formData.append('price', price);
    formData.append('startDate', dayjs(startDate).format());
    formData.append('endDate', dayjs(endDate).format());
    formData.append('location.street', street ?? '');
    formData.append('location.number', number ?? '');
    formData.append('location.locality', locality!);
    formData.append('location.postalCode', postalCode!);
    formData.append('location.country', country!);
    formData.append('holidayId', id);
    if (file) {
      formData.append('uploadedActivityPicture', file);
    }

    // CALL TO API TO REGITER THE ACTIVITY
    mutateActivity(
      formData,
      { onError: () => alert('An error occurred'), onSuccess: () => navigate(`/holidays/${id}`) }
    );
  };

  return (
    <PageWrapper>
      <FormContainer title="Encoder activité">
        <GenericForm
          fields={inputsActivity}
          initialValues={initialValues}
          textAreaProps={descriptionTextArea}
          buttonText="Encoder"
          onSubmit={handleSubmit}
          error={error}
        />
      </FormContainer>
    </PageWrapper>
  );
};
export default EncodeActivity;
