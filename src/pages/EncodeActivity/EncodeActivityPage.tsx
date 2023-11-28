import FormContainer from '../../components/common/FormContainer.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import GenericForm from '../../components/common/GenericForm.tsx';
import dayjs from 'dayjs';
import { useCreateActivity } from '../../api/Queries/ActivityQueries.ts';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { InitialValues } from '../../../typing/inputType.ts';
import { validateDatesWithoutHour } from '../../validators/dateValidator.ts';
import { useState } from 'react';
import { formattedDate } from '../../components/common/utils/dateUtils.ts';
import {AxiosError} from "axios";
import ErrosForm from "../../components/ErrorsForm/ErrorsForm.tsx";
import {descriptionTextAreaActivityObject, inputsActivityTab} from "../../data/inputs.tsx";

const EncodeActivityPage = () => {
  const { id } = useParams();
  // TODO : id! ou id ?? ''
  const { mutate: mutateActivity, error: ErrorMutateActivity } = useCreateActivity() as {
    mutate: any
    error: AxiosError<unknown>;
  };

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const inputsActivity = inputsActivityTab
  const descriptionTextArea = descriptionTextAreaActivityObject;

  const initialValues = {
    name: '',
    description: '',
    country: '',
    number: '',
    street: '',
    postalCode: '',
    locality: '',
    price: '',
    startDate: formattedDate(false, true, 30),
    endDate: formattedDate(true, true, 30),
  };

  const handleSubmit = (values: InitialValues) => {
    const { name, description, country, number, street, postalCode, locality, startDate, endDate, price, file } =
      values;

    const datesValid = validateDatesWithoutHour(startDate as string, endDate as string, true);
    if (datesValid) {
      setError(datesValid);
      return;
    }
    setError('');

    const formData = new FormData();
    formData.append('name', name ?? '');
    formData.append('description', description ?? '');
    formData.append('price', String(price).replace(/\./g, ',')); // FormData n'accepete pas de number
    formData.append('startDate', dayjs(startDate).format());
    formData.append('endDate', dayjs(endDate).format());
    formData.append('location.street', street ?? '');
    formData.append('location.number', number ?? '');
    formData.append('location.locality', locality!);
    formData.append('location.postalCode', postalCode!);
    formData.append('location.country', country!);
    formData.append('holidayId', id!);
    if (file) {
      formData.append('uploadedActivityPicture', file);
    }

    // CALL TO API TO REGITER THE ACTIVITY
    mutateActivity(formData, {
      onSuccess: () => navigate(`/holidays/${id}`),
    });
  };
  return (
    <PageWrapper>
      <FormContainer title="Encoder activité">
        {ErrorMutateActivity ? (
          <ErrosForm axiosError={ErrorMutateActivity?.response?.data} />
        ): (<> </>)}
        <GenericForm
          fields={inputsActivity}
          initialValues={initialValues}
          textAreaProps={descriptionTextArea}
          descriptionValue={''}
          buttonText="Encoder"
          onSubmit={handleSubmit}
          error={error}
          picturePath={''}
        />
      </FormContainer>
    </PageWrapper>
  );
};
export default EncodeActivityPage;
