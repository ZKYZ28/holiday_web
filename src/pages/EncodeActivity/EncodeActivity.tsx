import FormContainer from '../../components/common/FormContainer.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import GenericForm from '../../components/common/GenericForm.tsx';
import * as dayjs from 'dayjs';
import { useCreateActivity } from '../../api/Queries/ActivityQueries.ts';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const inputsActivity = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    placeholder: 'Drift',
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
    type: 'datetime-local',
    placeholder: '',
    errorMessage: 'Ça doit être une date valide !',
    label: 'Date de début :',
    required: true,
  },
  {
    id: 'endDate',
    name: 'endDate',
    type: 'datetime-local',
    placeholder: '',
    errorMessage: 'Ça doit être une date valide !',
    label: 'Date de fin :',
    required: true,
  },
  {
    id: 'price',
    name: 'price',
    type: 'number',
    placeholder: '',
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
  errorMessage: '',
  label: 'Description',
  required: false,
};

const EncodeActivity = () => {
  const { id } = useParams();
  const { mutate: mutateActivity } = useCreateActivity(id);
  const navigate = useNavigate();

  const initalValues = {
    name: '',
    description: '',
    country: '',
    number: '',
    street: '',
    postalCode: '',
    locality: '',
    price: '',
    startDate: '',
    endDate: '',
  };

  const handleSubmit = (values) => {
    const { name, description, country, number, street, postalCode, locality, startDate, endDate, price } = values;

    // CALL TO API TO REGITER THE ACTIVITY
    mutateActivity(
      {
        name,
        description,
        price,
        startDate: dayjs(startDate).format(),
        endDate: dayjs(endDate).format(),
        location: {
          street,
          number,
          locality,
          postalCode,
          country,
        },
      },
      { onError: () => alert('An error occurred'), onSuccess: () => navigate(`/holidays/${id}`) }
    );
  };



  return (
      <PageWrapper>
        <FormContainer title="Encoder activité">
          <GenericForm
            fields={inputsActivity}
            initalValues={initalValues}
            textAreaProps={descriptionTextArea}
            buttonText="Encoder"
            onSubmit={handleSubmit}
          />
        </FormContainer>
      </PageWrapper>
  );
};
export default EncodeActivity;
