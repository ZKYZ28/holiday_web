import ButtonLink from '../../../components/Header/ButtonLink/ButtonLink.tsx';
import driftCard from '../../../assets/imgs/bg/drift.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEuroSign } from '@fortawesome/free-solid-svg-icons/faEuroSign';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons/faCalendarDays';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Activity } from '../../../api/Models/Activity.ts';

function MyHolidayCard({ activity }: { activity: Activity }) {
  return (
    <div className="lg:flex bg-white rounded-2xl">
      <img className="object-cover w-full h-100 rounded-lg lg:w-64" src={driftCard} alt="" />

      <div className="flex flex-col justify-between p-6 lg:mx-6">
        <div className="flex flex-row justify-between">
          <h3 className="text-xl md:text-3xl font-bold text-blue-800 ">{activity.name}</h3>
          <div>
            <FontAwesomeIcon icon={faPencil} size="xl" className="text-blue-800" />
            <FontAwesomeIcon icon={faTrash} size="xl" className="text-red-600 ml-3" />
          </div>
        </div>
        <p className="my-8 text-base lg:text-lg"> {activity.description} </p>

        <ul className="flex flex-col justify-around">
          <div className="flex flex-row items-center mb-1.5">
            <FontAwesomeIcon icon={faCalendarDays} size="xl" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl ">{activity.startDate}</li>
          </div>

          <div className="flex flex-row items-center mb-1.5">
            <FontAwesomeIcon icon={faEuroSign} size="xl" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl">{activity.price}</li>
          </div>

          <div className="flex flex-row items-center mb-1.5">
            <FontAwesomeIcon icon={faLocationDot} size="xl" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl ">
              {activity.location.street} {activity.location.number}, {activity.location.postalCode}{' '}
              {activity.location.locality}
            </li>
          </div>
        </ul>

        <div className="flex justify-center items-center mt-5">
          <ButtonLink text="Participant(s)" to="/myholiday" />
        </div>
      </div>
    </div>
  );
}

export default MyHolidayCard;
