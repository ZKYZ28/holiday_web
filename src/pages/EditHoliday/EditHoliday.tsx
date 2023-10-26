import FormContainer from '../../components/common/FormContainer.tsx';
import { useGetHolidayById, useUpdateHoliday } from '../../api/Queries/HolidayQueries.ts';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import GenericForm from '../../components/common/GenericForm.tsx';
import { InitialValues } from '../../../typing/inputType.ts';
import { useState } from 'react';
import { useAuth } from '../../provider/AuthProvider.tsx';
import Loading from '../../components/common/Loading.tsx';
import dayjs from 'dayjs';
import { validateDatesWithoutHour } from '../../validators/dateValidator.ts';

const inputsHoliday = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'Vacances 2023-2024',
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
    type: 'text',
    placeholder: '77 A',
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
    errorMessage:
      'Veuillez saisir une adresse de rue valide contenant entre 1 et 100 caractères. Seules les lettres, chiffres, espaces, apostrophes, points, virgules, slashes et tirets sont autorisés.',
    pattern: '^[A-Za-zÀ-ÿ0-9\\s\'.\\,\\/\\-]{1,100}$',
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
    type: 'date',
    placeholder: '20/10/2023',
    errorMessage:
      'La date de début doit respecter le format de valide comme JJ/MM/YYYY (20/10/2023) ou YYYY/MM/DD(2023/10/20)',
    label: 'Date de début :',
    required: true,
  },
  {
    id: 'endDate',
    name: 'endDate',
    type: 'date',
    placeholder: '23/10/2023',
    errorMessage:
      'La date de fin doit respecter le format de valide comme JJ/MM/YYYY (23/10/2023) ou YYYY/MM/DD (2023/10/23)',
    label: 'Date de fin :',
    required: true,
  },
];

const descriptionTextArea = {
  id: 'description',
  name: 'description',
  type: 'message',
  placeholder: 'Ceci est la description de ma vacance !',
  errorMessage: 'Veuillez saisir un message d\'au moins 10 caractères',
  label: 'Description',
  required: false,
};

const EditHoliday = () => {
  // DECLARATION DES VARIABELS
  const { id } = useParams();
  const { mutate: mutateUpdateHoliday } = useUpdateHoliday();
  const [error, setError] = useState('');
  const { data: holidayData, isLoading } = useGetHolidayById(id!);
  const navigate = useNavigate();
  const { user } = useAuth();

  // ASSIGNATION DES VALEURS DE BASE
  const initialValues  = {
    name: holidayData?.name ?? '',
    country: holidayData?.location?.country ?? '',
    number: holidayData?.location?.number ?? '',
    street: holidayData?.location?.street ?? '',
    postalCode: holidayData?.location?.postalCode ?? '',
    locality: holidayData?.location?.locality ?? '',
    startDate: dayjs(holidayData?.startDate).format('YYYY-MM-DD') ?? '',
    endDate: dayjs(holidayData?.endDate).format('YYYY-MM-DD') ?? '',
  };

  const descriptionValue = holidayData?.description ?? '';
  const pathPicture = holidayData?.holidayPath;

  const handleSubmit = (values: InitialValues) => {
    const { name, country, number, street, postalCode, locality, startDate, endDate, description, file, deleteImage } =
      values;

    const datesValid = validateDatesWithoutHour(startDate as string, endDate as string);
    if (datesValid) {
      setError(datesValid);
      return;
    }
    setError('');

    const formData = new FormData();
    formData.append('name', name ?? '');
    formData.append('description', description ?? '');
    formData.append('startDate', dayjs(startDate).format());
    formData.append('endDate', dayjs(endDate).format());
    formData.append('location.Id', holidayData!.location!.id!);
    formData.append('location.street', street ?? '');
    formData.append('location.number', number ?? '');
    formData.append('location.locality', locality!);
    formData.append('location.postalCode', postalCode!);
    formData.append('location.country', country!);
    formData.append('creatorId', user!.id);
    if (file) {
      formData.append('uploadedHolidayPicture', file);
    }
    formData.append('deleteImage', deleteImage.toString());
    formData.append('initialPath', pathPicture!);

    mutateUpdateHoliday(
      { holidayId: id!, updatedHoliday: formData },
      {
        onError: () => alert('An error occurred'),
        onSuccess: () => {
          navigate('/holidays');
        },
      }
    );
  };

  return (
    <PageWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <FormContainer title={`Mettre à jour : ${holidayData!.name}`}>
          <GenericForm
            fields={inputsHoliday}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            textAreaProps={descriptionTextArea}
            descriptionValue={descriptionValue}
            buttonText="Encoder"
            error={error}
            picturePath={pathPicture!}
          />
        </FormContainer>
      )}
    </PageWrapper>
  );
};
export default EditHoliday;
