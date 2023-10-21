import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';
import { useParams } from 'react-router-dom';
import { useGetHolidayById } from '../../api/Queries/HolidayQueries.ts';
import * as dayjs from 'dayjs';
import MyHolidayWeather from './MyHolidayWeather/MyHolidayWeather.tsx';
import MyHolidayListMembers from './MyHolidayMembers/MyHolidayListMembers.tsx';
import MyHolidayActivities from './MyHolidayActivities/MyHolidayActivities.tsx';
import { Holiday } from '../../api/Models/Holiday.ts';

function MyHolidayPage() {
  const { id } = useParams();
  // TODO : JEREM
  const { data: holidayData, isLoading: holidayIsLoading }: { data: Holiday; isLoading: unknown } = useGetHolidayById(
    id!
  );

  return (
    <PageWrapper>
      <PageContent pageTitle={holidayData.name}>
        <div>
          <h2 className="text-xl capitalize lg:text-2xl text-blue-800 font-bold mb-4">
            {dayjs(holidayData.startDate).format('DD-MM-YYYY')}
          </h2>

          <div className="w-full flex flex-col items-center md:flex-row md:flex-wrap md:justify-between">
            <MyHolidayListMembers id={id} />
            <MyHolidayWeather id={id!} />
          </div>

          <MyHolidayActivities id={id!} holidayData={holidayData} holidayIsLoading={holidayIsLoading} />
        </div>
      </PageContent>
    </PageWrapper>
  );
}

export default MyHolidayPage;
