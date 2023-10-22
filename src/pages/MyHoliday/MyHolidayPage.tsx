import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';
import {useParams} from 'react-router-dom';
import {useGetExportHoliday, useGetHolidayById, usePublishHoliday} from '../../api/Queries/HolidayQueries.ts';
import * as dayjs from 'dayjs';
import MyHolidayWeather from './MyHolidayWeather/MyHolidayWeather.tsx';
import MyHolidayListMembers from './MyHolidayMembers/MyHolidayListMembers.tsx';
import MyHolidayActivities from './MyHolidayActivities/MyHolidayActivities.tsx';
import {useState} from "react";
import Modal from '../../components/Modal.tsx';
import {useLeaveHoliday} from "../../api/Queries/ParticipantQueries.ts";
import {useAuth} from "../../provider/AuthProvider.tsx";
import { useNavigate } from 'react-router-dom';

function MyHolidayPage() {
  const { id } = useParams();
  const {user} = useAuth();
  // TODO : JEREM
  const [showModalInvitation, setShowModalInvitation] = useState(false);
  const [showModalLeave, setShowModalLeave] = useState(false);
  const { data: holidayData, isLoading: holidayIsLoading } = useGetHolidayById(id!);
  const { mutate: mutateExportHoliday } = useGetExportHoliday(id!);
  const{mutate: mutatePusblishHoliday} = usePublishHoliday();
  const{mutate: mutateLeaveHoliday} = useLeaveHoliday(user!.id);
  const navigate = useNavigate();

  //EXPORT DE L'AGENDA
  const handleDownload = async () => {
    await mutateExportHoliday(undefined, {
      onError: () => alert('Erreur lors de l export de la holiday dans l agenda')
    });
  };

    const openModalInvitation = (): void => {
        setShowModalInvitation(true);
    };

    const closeModalInvitation = (): void => {
        setShowModalInvitation(false);
    };

    const handlePublish = async () => {
        await mutatePusblishHoliday(holidayData, {
            onError: () => alert('Erreur lors de la publication de la holiday')
        });
    };

    const closeModalLeave = (): void => {
        setShowModalLeave(false);
    };

    const openModalLeave = (): void => {
        setShowModalLeave(true);
    };

    const handleLeave = async () => {
        await mutateLeaveHoliday(holidayData, {
            onError: () => alert('Erreur'), onSuccess : () => navigate(`/holidays`)
        });
    };


  return (
    <PageWrapper>
      <PageContent pageTitle={holidayData.name}>
        <div>

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl capitalize lg:text-2xl text-blue-800 font-bold">
              {dayjs(holidayData.startDate).format('DD-MM-YYYY')}
            </h2>
            <div>
              {holidayData.isPublish ? (
                <button
                  type="button"
                  className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                >
                  Publiée
                </button>
              ) : (
                <button
                  onClick={openModalInvitation}
                  type="button"
                  className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                 >
                  Publier
                </button>
              )}

              <button
                onClick={handleDownload}
                type="button"
                className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
              >
                Exporter dans l'agenda
              </button>

              <button
                onClick={openModalLeave}
                type="button"
                className="inline-block bg-red-600 hover-bg-red-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
              >
                Quitter
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col items-center md:flex-row md:flex-wrap md:justify-between">
            <MyHolidayListMembers id={id} />
            <MyHolidayWeather id={id!} />
          </div>

          <MyHolidayActivities id={id!} holidayData={holidayData} holidayIsLoading={holidayIsLoading} />

          {showModalInvitation && (
            <Modal
              show={showModalInvitation}
              onClose={closeModalInvitation}
            >
            <div className="flex flex-col justify-center items-center w-full">
              <p className="text-center">Etes-vous sûr de vouloir publier cette période de vacance ? Cela veut dire que tout les utilisateurs pourront la voir. </p>

              <div className="flex justify-around mt-6 w-full">
                <button
                  onClick={handlePublish}
                  type="button"
                  className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                >
                  Confirmer
                </button>

                <button
                  onClick={closeModalInvitation}
                  type="button"
                  className="inline-block bg-red-600 hover-bg-red-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                >
                  Fermer
                </button>
              </div>
            </div>
            </Modal>
          )}

          {showModalLeave && (
              <Modal
                  show={showModalLeave}
                  onClose={closeModalLeave}
              >
                  <div className="flex flex-col justify-center items-center w-full">
                      <p className="text-center">Etes-vous sûr de vouloir quitter <span className="font-bold text-blue-800">{holidayData.name}</span> ? </p>

                      <div className="flex justify-around mt-6 w-full">
                          <button
                              onClick={handleLeave}
                              type="button"
                              className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                          >
                              Confirmer
                          </button>

                          <button
                              onClick={closeModalLeave}
                              type="button"
                              className="inline-block bg-red-600 hover-bg-red-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                          >
                              Fermer
                          </button>
                      </div>
                  </div>
              </Modal>
          )}

        </div>
      </PageContent>
    </PageWrapper>
  );
}

export default MyHolidayPage;
