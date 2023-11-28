import FormContainer from '../../components/common/FormContainer.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import GenericForm from '../../components/common/GenericForm.tsx';
import dayjs from 'dayjs';
import { useGetActivityById, useUpdateActivity } from '../../api/Queries/ActivityQueries.ts';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { InitialValues } from '../../../typing/inputType.ts';
import { validateDatesWithoutHour } from '../../validators/dateValidator.ts';
import { useState } from 'react';
import Loading from '../../components/common/Loading.tsx';
import {AxiosError} from "axios";
import ErrosForm from "../../components/ErrorsForm/ErrorsForm.tsx";
import {descriptionTextAreaActivityObject, inputsActivityTab} from "../../data/inputs.tsx";


const EditActivityPage = () => {
  const { id } = useParams();
  const { data: activityData, isLoading } = useGetActivityById(id!);
  const { mutate: mutateUpdateActivity, error: ErrorUpdateActivity } = useUpdateActivity()  as {
    mutate: any
    error: AxiosError<unknown>;
  };

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const inputsActivity = inputsActivityTab
  const descriptionTextArea = descriptionTextAreaActivityObject;

  const initialValues = {
    name: activityData?.name ?? '',
    country: activityData?.location?.country ?? '',
    number: activityData?.location?.number ?? '',
    street: activityData?.location?.street ?? '',
    postalCode: activityData?.location?.postalCode ?? '',
    locality: activityData?.location?.locality ?? '',
    startDate: dayjs(activityData?.startDate).format('YYYY-MM-DD HH:mm:ss') ?? '',
    endDate: dayjs(activityData?.endDate).format('YYYY-MM-DD HH:mm:ss') ?? '',
    price: String(activityData?.price),
  };

  const descriptionValue = activityData?.description ?? '';
  const pathPicture = activityData?.activityPath;

  const handleSubmit = (values: InitialValues) => {
    const {
      name,
      description,
      country,
      number,
      street,
      postalCode,
      locality,
      startDate,
      endDate,
      price,
      file,
      deleteImage,
    } = values;

    const datesValid = validateDatesWithoutHour(startDate as string, endDate as string, true);
    if (datesValid) {
      setError(datesValid);
      return;
    }
    setError('');

    const formData = new FormData();
    formData.append('name', name ?? '');
    formData.append('description', description ?? '');
    formData.append('price', price!.toString());
    formData.append('startDate', dayjs(startDate).format());
    formData.append('endDate', dayjs(endDate).format());
    formData.append('location.Id', activityData!.location!.id!);
    formData.append('location.street', street ?? '');
    formData.append('location.number', number ?? '');
    formData.append('location.locality', locality!);
    formData.append('location.postalCode', postalCode!);
    formData.append('location.country', country!);
    formData.append('holidayId', activityData!.holidayId!);
    if (file) {
      formData.append('uploadedActivityPicture', file);
    }
    formData.append('deleteImage', deleteImage.toString());
    formData.append('initialPath', pathPicture!);

    // CALL TO API TO REGITER THE ACTIVITY
    mutateUpdateActivity(
      { activityId: id!, updatedActivity: formData },
      {
        onSuccess: () => navigate(`/holidays/${activityData!.holidayId!}`),
      }
    );
  };

  return (
    <PageWrapper>
      {isLoading ? (
        <Loading />
      ) : (
        <FormContainer title={`Mettre à jour : ${activityData!.name}`}>
          {ErrorUpdateActivity ? (
            <ErrosForm axiosError={ErrorUpdateActivity?.response?.data} />
          ): (<> </>)}
          <GenericForm
            fields={inputsActivity}
            initialValues={initialValues}
            textAreaProps={descriptionTextArea}
            descriptionValue={descriptionValue}
            buttonText="Encoder"
            onSubmit={handleSubmit}
            error={error}
            picturePath={pathPicture ?? ''}
          />
        </FormContainer>
      )}
    </PageWrapper>
  );
};
export default EditActivityPage;
