import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MyHolidayCard from '../MyHolidayCard/MyHolidayCard.tsx';
import { Holiday } from '../../../api/Models/Holiday.ts';
import { Activity } from '../../../api/Models/Activity.ts';
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
        <NavLink to={`/holidays/activity/${id}`}>
          <FontAwesomeIcon className="text-blue-800" icon={faPlus} size="xl" />
        </NavLink>
      </header>
      <div className="overflow-y-scroll">
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 p-3" style={{ height: '50rem' }}>
          {holidayIsLoading ? (
            <p>Chargement en cours...</p>
          ) : (
            <>
              {holidayData && holidayData.activities && holidayData.activities.length === 0 ? (
                <p>Aucune activité disponible</p>
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
