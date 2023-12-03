import ButtonLink from '../../../components/Header/ButtonLink/ButtonLink.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons/faEuroSign';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Activity } from '../../../api/Models/Activity.ts';
import { useDeleteActivity } from '../../../api/Queries/ActivityQueries.ts';
import Modal from '../../../components/Modal/Modal.tsx';
import { useState } from 'react';
import {NavLink, useParams} from 'react-router-dom';
import dayjs from 'dayjs';

function ActivityCard({ activity, isPublish }: { activity: Activity, isPublish: boolean}) {
  const{id} = useParams();
  const { mutate: mutateActivity } = useDeleteActivity();
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);

  // GESTION DE LA MONDAL
  const openModalConfirmation = (): void => {
    setShowModalConfirmation(true);
  };

  const closeModalConfirmation = (): void => {
    setShowModalConfirmation(false);
  };

  function handleDeleteClick() {
   mutateActivity(activity.id, {
     onError: () => alert('Erreur lors de la suppression de l\'activité.')
   });
  }


  return (
    <div className="block h-auto justify-between bg-white rounded-2xl box-shadow">
      <div className="w-full">
        <img className="object-cover w-full h-72 rounded-lg" src={`${import.meta.env.VITE_BASE_API}/${activity.activityPath}`} alt="IMAGE" />
      </div>
      <div className="flex flex-col justify-between p-6 lg:mx-6">
        <div className="flex flex-row justify-between">
          <h3 className="text-xl md:text-3xl font-bold text-blue-800 ">{activity.name}</h3>

          {!isPublish ? (
              <div>
                <NavLink to={`/holidays/${id}/activity/${activity.id}`} >
                  <FontAwesomeIcon icon={faPencil} size="xl" className="text-blue-800"/>
                </NavLink>
                <FontAwesomeIcon
                    icon={faTrash}
                    size="xl"
                    className="text-red-600 ml-3 cursor-pointer"
                    onClick={() => {
                      openModalConfirmation();
                    }}
                />
              </div>
          ):(<></>)}

        </div>
        <p className="my-8 text-base lg:text-lg"> {activity.description} </p>

        <ul className="flex flex-col justify-around">
          <div className="flex flex-row items-center mb-1.5">
            <FontAwesomeIcon icon={faCalendarDays} size="xl" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl ">{dayjs(activity.startDate).format('DD-MM-YYYY à HH:MM')}</li>
          </div>

          <div className="flex flex-row items-center mb-1.5">
            <FontAwesomeIcon icon={faEuroSign} size="xl" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl">{activity.price}</li>
          </div>

          <div className="flex flex-row items-center mb-1.5">
            <FontAwesomeIcon icon={faLocationDot} size="xl" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl ">
              {activity.location.street} {activity.location.number}
              {(activity.location.street || activity.location.number) && ','} {activity.location.postalCode} {activity.location.locality}
            </li>
          </div>
        </ul>

        {!isPublish ? (
          <div className="flex justify-center items-center mt-8">
            <ButtonLink text="Participant(s)" to={`/activity/participants/${activity.id}`} />
          </div>
        ) : (<></>)}
      </div>

      {showModalConfirmation && (
        <Modal show={showModalConfirmation} onClose={closeModalConfirmation} title={'Supprimer'}>
          <div className="flex flex-col justify-center items-center w-full">
            <p className="text-center">Etes-vous sûr de vouloir supprimer cette activité ?</p>

            <div className="flex justify-around mt-6 w-full">
              <button
                onClick={handleDeleteClick}
                type="button"
                className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
              >
                Confirmer
              </button>

              <button
                onClick={closeModalConfirmation}
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
  );
}

export default ActivityCard;
