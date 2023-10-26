import ButtonLink from '../../../components/Header/ButtonLink/ButtonLink.tsx';
import calendar from '../../../assets/imgs/icons/calendar.png';
import peoples from '../../../assets/imgs/icons/peoples.png';
import location from '../../../assets/imgs/icons/location.png';
import * as dayjs from 'dayjs';
import { Holiday } from '../../../api/Models/Holiday.ts';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faEdit} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import Modal from "../../../components/Modal.tsx";
import {useDeleteHoliday} from "../../../api/Queries/HolidayQueries.ts";
import {urlApi} from '../../../api/EndPoints/HolidayApi.ts';
import {NavLink} from "react-router-dom";

function ListHolidayCard({ holiday, isPersonalHoliday }: { holiday: Holiday, isPersonalHoliday: boolean }) {
  const id = `/holidays/${holiday.id}`;
  const [showModalInvitation, setShowModalInvitation] = useState(false);
  const {mutate: mutateHoliday} = useDeleteHoliday();

  const openModalInvitation = (): void => {
    setShowModalInvitation(true);
  };

  const closeModalInvitation = (): void => {
    setShowModalInvitation(false);
  };

  function handleDeleteClick() {
    mutateHoliday(
      holiday,
      { onError: () => alert('An error occurred')}
    )
  }

  return (
    <div className="lg:flex bg-white rounded-2xl">
      <img className="object-cover w-full h-100 rounded-lg lg:w-64" src={`${urlApi()}${holiday.holidayPath}`} alt="" />

      <div className="flex flex-col justify-between p-6 lg:mx-6 w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-3xl font-bold text-blue-800 ">{holiday.name}</h3>
          <div className="flex items-center">
            {holiday.isPublish ? (
              <img className="object-cover rounded-lg w-8 h-8 ml-2.5" src="https://cdn-icons-png.flaticon.com/512/3946/3946164.png" alt="" />
            ) : (
              <></>
            )}
            {isPersonalHoliday ? (
              <>
                <NavLink to={`/holidays/holiday/${holiday.id}`}>
                  <FontAwesomeIcon icon={faEdit} size="xl" className="text-blue-700 ml-3 cursor-pointer" />
                </NavLink>
                <FontAwesomeIcon icon={faTrash} size="xl" className="text-red-600 ml-3 cursor-pointer" onClick={openModalInvitation}/>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <p className="my-8 text-base lg:text-lg"> {holiday.description} </p>

        <ul className="flex flex-col justify-around">
          <div className="flex flex-row items-center mb-1.5">
            <img src={calendar} alt="CALENDAR" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl ">{dayjs(holiday.startDate).format('DD-MM-YYYY')}</li>
          </div>

          <div className="flex flex-row items-center mb-1.5">
            <img src={peoples} alt="PEOPLES" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl">X</li>
          </div>

          <div className="flex flex-row items-center mb-1.5">
            <img src={location} alt="LOCATION" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl ">
              {holiday.location.locality}, {holiday.location.country}
            </li>
          </div>
        </ul>

        <div className="flex justify-center items-center mt-5">
          <ButtonLink text="Voir plus" to={id} />
        </div>
      </div>

      {showModalInvitation && (
        <Modal
          show={showModalInvitation}
          onClose={closeModalInvitation}
        >
          <div className="flex flex-col justify-center items-center w-full">
            <p className="text-center">Etes-vous sûr de vouloir supprimer cette activité vacance?<span className={"font-bold text-red-600"}>Attention, elle sera également supprimée pour tous les participants !</span></p>

            <div className="flex justify-around mt-6 w-full">
              <button
                onClick={handleDeleteClick}
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

    </div>
  );
}

export default ListHolidayCard;
