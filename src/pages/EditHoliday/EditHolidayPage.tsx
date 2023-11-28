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
import {AxiosError} from "axios";
import ErrosForm from "../../components/ErrorsForm/ErrorsForm.tsx";
import {descriptionTextAreaHolidayObject, inputsHolidayTab} from "../../data/inputs.tsx";

const EditHolidayPage = () => {
  // DECLARATION DES VARIABELS
  const { id } = useParams();
  const { mutate: mutateUpdateHoliday, error: ErrorUpdateHoliday } = useUpdateHoliday() as {
    mutate: any
    error: AxiosError<unknown>;
  };

  const [error, setError] = useState('');
  const { data: holidayData, isLoading } = useGetHolidayById(id!);
  const navigate = useNavigate();
  const { user } = useAuth();
  const inputsHoliday = inputsHolidayTab;
  const descriptionTextArea = descriptionTextAreaHolidayObject;

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
          {ErrorUpdateHoliday ? (
            <ErrosForm axiosError={ErrorUpdateHoliday?.response?.data} />
          ): (<> </>)}
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
export default EditHolidayPage;
