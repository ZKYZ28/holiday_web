import FormContainer from '../../components/common/FormContainer.tsx';
import { useCreateHoliday } from '../../api/Queries/HolidayQueries.ts';
import dayjs from 'dayjs';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import { useNavigate } from 'react-router-dom';
import GenericForm from '../../components/common/GenericForm.tsx';
import { validateDatesWithoutHour } from '../../validators/dateValidator.ts';
import { useState } from 'react';
import { formattedDate } from '../../components/common/utils/dateUtils.ts';
import { InitialValues } from '../../../typing/inputType.ts';
import { useAuth } from '../../provider/AuthProvider.tsx';
import ErrosForm from "../../components/ErrorsForm/ErrorsForm.tsx";
import {AxiosError} from "axios";
import {descriptionTextAreaHolidayObject, inputsHolidayTab} from '../../data/inputs.tsx';




const EncodeHolidayPage = () => {
  const { mutate: mutateHoliday, error: ErrorMutateHoliday }= useCreateHoliday() as {
    mutate: any
    error: AxiosError<unknown>;
  };

  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { user } = useAuth();
  const initialValues = {
    name: '',
    country: '',
    number: '',
    street: '',
    postalCode: '',
    locality: '',
    startDate: formattedDate(),
    endDate: formattedDate(true),
  };
  const inputsHoliday = inputsHolidayTab;
  const descriptionTextArea = descriptionTextAreaHolidayObject;


  const handleSubmit = (values: InitialValues) => {
    const { name, country, number, street, postalCode, locality, startDate, endDate, description, file } = values;

    const datesValid = validateDatesWithoutHour(startDate as string, endDate as string);
    if (datesValid) {
      setError(datesValid);
      return;
    }
    setError('');

    // TODO VERIFIER SI ACTIVITIES EST NECESSAIRE
    const formData = new FormData();
    formData.append('name', name ?? '');
    formData.append('description', description ?? '');
    formData.append('startDate', dayjs(startDate).format());
    formData.append('endDate', dayjs(endDate).format());
    formData.append('location.street', street ?? '');
    formData.append('location.number', number ?? '');
    formData.append('location.locality', locality!);
    formData.append('location.postalCode', postalCode!);
    formData.append('location.country', country!);
    formData.append('creatorId', user!.id);
    if (file) {
      formData.append('uploadedHolidayPicture', file);
    }

    mutateHoliday(formData, {
      onSuccess: () => {
        navigate('/holidays');
      },
    });
  };

  return (
    <PageWrapper>
      <FormContainer title="Encoder vacances">
        {ErrorMutateHoliday ? (
            <ErrosForm axiosError={ErrorMutateHoliday?.response?.data} />
          ): (<> </>)}
          <GenericForm
            fields={inputsHoliday}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            textAreaProps={descriptionTextArea}
            buttonText="Encoder"
            descriptionValue=""
            error={error}
            picturePath={''}
          />

      </FormContainer>
    </PageWrapper>
  );

};
export default EncodeHolidayPage;
