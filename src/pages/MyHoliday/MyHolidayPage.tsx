import TitleH2 from '../../components/common/TiteH2.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';
import {useParams} from 'react-router-dom';
import {useGetHolidayById} from "../../api/Queries/HolidayQueries.ts";
import * as dayjs from "dayjs";
import MyHolidayWeather from "./MyHolidayWeather/MyHolidayWeather.tsx";
import MyHolidayListMembers from "./MyHolidayMembers/MyHolidayListMembers.tsx";
import MyHolidayActivities from "./MyHolidayActivities/MyHolidayActivities.tsx";

function MyHolidayPage() {

  const { id } = useParams();
  const { data: holidayData , isLoading: holidayIsLoading } = useGetHolidayById(id);

  return (
    <PageWrapper>
      <PageContent pageTitle={holidayData.name}>
        <div>
          <TitleH2 text={dayjs(holidayData.startDate).format("DD-MM-YYYY")} />

          {/*Section du haut avec les membres et la météo*/}
          <div className="w-full flex flex-col items-center md:flex-row md:flex-wrap md:justify-between">
            <MyHolidayListMembers id={id} />
            <MyHolidayWeather id={id}/>
          </div>

          {/*Section du bas avec les activités*/}
          <MyHolidayActivities id={id} holidayData={holidayData} holidayIsLoading={holidayIsLoading}/>

        </div>
      </PageContent>
    </PageWrapper>
  );
}

export default MyHolidayPage;
