import ButtonLink from '../../components/common/ButtonLink.tsx';
import ListHolidayCard from './ListHolidayCard/ListHolidayCard.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';

const ListHolidayPage = () => {
  return (
    <PageWrapper>
      <PageContent pageTitle="Mes vacances">
        <div>
          {/*{// TODO : mettre le bon lien to}*/}
          <ButtonLink text="Encoder" to="/holidays/create" />
          <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
            <ListHolidayCard />
            <ListHolidayCard />
            <ListHolidayCard />
            <ListHolidayCard />
            <ListHolidayCard />
            <ListHolidayCard />
          </div>
        </div>
      </PageContent>
    </PageWrapper>
  );
};

export default ListHolidayPage;
