import ListHolidayCard from './ListHolidayCard/ListHolidayCard.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';
import { useGetAllHoliday } from '../../api/Queries/HolidayQueries.ts';
import ModalInvitation from './MondalInvitation/ModalInvitation.tsx';
import { useState } from 'react';
import { useAuth } from '../../provider/AuthProvider.tsx';
import { useGetInvitations } from '../../api/Queries/InvitationQueries.ts';
import { NavLink } from 'react-router-dom';

const ListHolidayPage = () => {
  const { user } = useAuth();
  console.log(user?.id)
  const { data: holidays, isLoading } = useGetAllHoliday(user.id!);
  const [showModalInvitation, setShowModalInvitation] = useState(false);
  const { data: invitations, isLoading: invitationsIsLoading, error: invitationsError } = useGetInvitations(user.id!);

  console.log(holidays);

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
                  <NavLink
                    className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                    to="/holidays/create"
                  >
                    Encoder
                  </NavLink>
                  <button
                    onClick={openModalInvitation}
                    type="button"
                    className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                  >
                    Invitations
                    <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-sm font-semibold text-blue-800 font-bold bg-white rounded-full">
                      {invitations.length}
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
          {showModalInvitation && (
            <ModalInvitation
              invitations={invitations}
              invitationsIsLoading={invitationsIsLoading}
              invitationsError={invitationsError}
              show={showModalInvitation}
              onClose={closeModalInvitation}
            />
          )}
        </>
      </PageContent>
    </PageWrapper>
  );
};

export default ListHolidayPage;
