import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Holiday } from '../../../api/Models/Holiday.ts';
import { Activity } from '../../../api/Models/Activity.ts';
import ActivityCard from "../ActivityCard/ActivityCard.tsx";
import { useState } from 'react';

function MyHolidayActivities({
  id,
  holidayData,
  holidayIsLoading,
  isPublish
}: {
  id: string;
  holidayData: Holiday;
  holidayIsLoading: boolean;
  isPublish: boolean;
}) {

  const [sortAscending, setSortAscending] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSortOrder = () => {
    setSortAscending((prevSortOrder) => !prevSortOrder);
  };

  const sortActivities = (activities: Activity[]) => {
    const sortedActivities = [...activities];

    sortedActivities.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();

      if (sortAscending) {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    const filteredActivities = sortedActivities.filter((activity) =>
      activity.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredActivities;
  };

  console.log("RENDER")
  return (
    <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200 mt-10">
      <header className="flex justify-between items-center px-5 py-4 border-b border-gray-100 ">
        <div>
          <h2 className="text-xl capitalize lg:text-2xl text-blue-800 font-bold ">Activités prévues</h2>
         <div className="flex items-center">
           <label className="relative inline-flex items-center cursor-pointer mt-3.5 mr-3.5">
             <input
               type="text"
               placeholder="Rechercher ..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="px-2 py-1 border border-gray-300 rounded-md"
             />
           </label>

            <label className="relative inline-flex items-center cursor-pointer mt-3.5">
              <input type="checkbox" value="" className="sr-only peer" onClick={toggleSortOrder} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-blue-800">
                  {sortAscending ? 'Date croissante' : 'Date décroissante'}
                </span>
            </label>
         </div>
        </div>

        {!isPublish ? (
            <NavLink to={`/holidays/${id}/activity`}>
              <FontAwesomeIcon className="text-blue-800 cursor-pointer" icon={faPlus} size="xl"  />
            </NavLink>
        ) : (
            <></>
          )}
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
                sortActivities(holidayData.activities).map((activity: Activity) => (
                  <ActivityCard key={activity.id} activity={activity} isPublish={isPublish} />
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
