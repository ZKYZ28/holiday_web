import ButtonLink from '../../components/common/ButtonLink.tsx';
import ListHolidayCard from './ListHolidayCard/ListHolidayCard.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';
import {useGetAllHoliday} from "../../api/Queries/HolidayQueries.ts";

const ListHolidayPage = () => {
  const { data: holidays = [], isLoading} = useGetAllHoliday();
  console.log(holidays)

  return (
    <PageWrapper>
        <PageContent pageTitle="Mes vacances">
          <div>
            {isLoading ? (
              <p>Chargement en cours...</p>
            ) : (
              <>
                <ButtonLink text="Encoder" to="/holidays/create" />
                <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
                  {holidays.map((holiday) => (
                    <ListHolidayCard />
                  ))}
                </div>
              </>
            )}
          </div>
        </PageContent>
    </PageWrapper>
  );
};

export default ListHolidayPage;
