import ButtonLink from '../../components/Header/ButtonLink/ButtonLink.tsx';
import ListHolidayCard from './ListHolidayCard/ListHolidayCard.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';
import { useGetAllHoliday } from '../../api/Queries/HolidayQueries.ts';
import { useState } from 'react';
import ModalInvitation from './MondalInvitation/ModalInvitation.tsx';

const ListHolidayPage = () => {
  const { data: holidays, isLoading } = useGetAllHoliday();
  const [showModalInvitation, setShowModalInvitation] = useState(false);

  const openModalInvitation = (): void => {
    setShowModalInvitation(true);
  };

  const closeModalInvitation = (): void => {
    setShowModalInvitation(false);
  };

  const backgroundClass = showModalInvitation ? 'blur-background' : '';

  return (
    <PageWrapper>
      <PageContent pageTitle="Mes vacances">
        <>
          <div>
            {isLoading ? (
              <p>Chargement en cours...</p>
            ) : (
              <>
                <div className="w-full flex justify-between">
                  <ButtonLink text="Encoder" to="/holidays/create" />
                  <button
                    onClick={openModalInvitation}
                    type="button"
                    className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                  >
                    Invitations
                    <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-sm font-semibold text-blue-800 font-bold bg-white rounded-full">
                      2
                    </span>
                  </button>
                </div>
                <div className={`grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 ${backgroundClass}`}>
                  {holidays.map((holiday) => (
                    <ListHolidayCard key={holiday.id} holiday={holiday} />
                  ))}
                </div>
              </>
            )}
          </div>
          {showModalInvitation && <ModalInvitation show={showModalInvitation} onClose={closeModalInvitation} />}
        </>
      </PageContent>
    </PageWrapper>
  );
};

export default ListHolidayPage;
