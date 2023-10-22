import ListHolidayCard from './ListHolidayCard/ListHolidayCard.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';
import {
  useGetAllHolidayByParticipant,
  useGetAllHolidayPublished,
} from '../../api/Queries/HolidayQueries.ts';
import Modal from '../../components/Modal.tsx';
import { useState } from 'react';
import { useAuth } from '../../provider/AuthProvider.tsx';
import { useGetInvitations } from '../../api/Queries/InvitationQueries.ts';
import { NavLink } from 'react-router-dom';
import ErrorMessage from "../../components/common/ErrorMessage.tsx";
import Loading from "../../components/common/Loading.tsx";
import HolidayInvitation from "./HolidayInvitation/HolidayInvitation.tsx";

const ListHolidayPage = () => {
  const { user } = useAuth();
  const [showModalInvitation, setShowModalInvitation] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [pageTitle, setPageTitle] = useState("Mes vacances");

  const { data: invitations, isLoading: invitationsIsLoading, error: invitationsError } = useGetInvitations(user!.id);
  const { data: holidays, isLoading } = isPublished ? useGetAllHolidayPublished() : useGetAllHolidayByParticipant(user!.id);
  console.log(holidays)

  //GESTION DE LA MONDALE
  const openModalInvitation = (): void => {
    setShowModalInvitation(true);
  };

  const closeModalInvitation = (): void => {
    setShowModalInvitation(false);
  };

  //FILTER DES VACANCES PUBLIEES

  const handleCheckboxChange = () => {
    setIsPublished(!isPublished);
    if(isPublished){
      setPageTitle("Mes vacances")
    }else{
      setPageTitle("Vacances publiées par les utilisateurs")
    }
  };

  const backgroundClass = showModalInvitation ? 'blur-background' : '';

  return (
    <PageWrapper>
      <PageContent pageTitle={pageTitle}>
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

                <div className="my-12">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={isPublished}
                      onChange={handleCheckboxChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-800"></div>
                    <span className="ml-3 text-lg font-medium text-gray-900">Vacances publiées par les utilisateurs</span>
                  </label>
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
            <Modal
              show={showModalInvitation}
              onClose={closeModalInvitation}
            >
              {invitationsError ? (
                // TODO JEREM
                <ErrorMessage message={invitationsError.response.data} />
              ) : (
                <>
                  {invitationsIsLoading ? (
                    <Loading />
                  ) : (
                    <>
                      {invitations.length === 0 ? (
                        <p>Aucune invitation disponible.</p>
                      ) : (
                        <ul className="my-4 space-y-3 overflow-y-scroll h-52 pr-4">
                          {invitations?.map((invitation ) => (
                            <HolidayInvitation key={invitation.Id} invitation={invitation} />
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </>
              )}
            </Modal>
          )}
        </>
      </PageContent>
    </PageWrapper>
  );
};

export default ListHolidayPage;
