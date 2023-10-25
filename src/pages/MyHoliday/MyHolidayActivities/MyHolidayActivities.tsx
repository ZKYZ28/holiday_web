import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MyHolidayCard from '../MyHolidayCard/MyHolidayCard.tsx';
import { Holiday } from '../../../api/Models/Holiday.ts';
import { Activity } from '../../../api/Models/Activity.ts';
import ErrorMessage from "../../../components/common/ErrorMessage.tsx";
// TOOD JEREM : holidayIsLoading => boolean ?
function MyHolidayActivities({
  id,
  holidayData,
  holidayIsLoading,
}: {
  id: string;
  holidayData: Holiday;
  holidayIsLoading: boolean;
}) {
  return (
    <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200 mt-10">
      <header className="flex justify-between items-center px-5 py-4 border-b border-gray-100 ">
        <h2 className="text-xl capitalize lg:text-2xl text-blue-800 font-bold ">Activités prévues</h2>
        <NavLink to={`/holidays/${id}/activity`}>
          <FontAwesomeIcon className="text-blue-800 cursor-pointer" icon={faPlus} size="xl"  />
        </NavLink>
      </header>
      <div className="overflow-y-scroll">
        <div className="grid grid-cols-1 gap-14 mt-6 md:grid-cols-2 p-8 max-height-list-activities">
          {holidayIsLoading ? (
            <p>Chargement en cours...</p>
          ) : (
            <>
              {holidayData && holidayData.activities && holidayData.activities.length === 0 ? (
                  <div className="flex items-center p-4 mb-4 text-sm text-black rounded-lg bg-yellow-100">
                      <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                      </svg>
                      <span className="sr-only">Info</span>
                      <p>
                          <span className="font-bold">Aucune activité disponible.</span>
                      </p>
                  </div>
              ) : (
                holidayData &&
                holidayData.activities &&
                holidayData.activities.map((activity: Activity) => (
                  <MyHolidayCard key={activity.id} activity={activity} />
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyHolidayActivities;
