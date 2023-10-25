import PageWrapper from '../../components/common/PageWrapper.tsx';

import './HomePage.css';
import {useGetParticipantsCount} from '../../api/Queries/ParticipantQueries.ts';
import { ChangeEvent, useState } from 'react';
import { useGetAllHolidayCountForDate } from '../../api/Queries/HolidayQueries.ts';
import {formattedDate} from "../../components/common/utils/dateUtils.ts";
import * as dayjs from "dayjs";

const HomePage = () => {
  const { data: countParticipants } = useGetParticipantsCount();
  const [date, setDate] = useState(formattedDate);
  const { mutate: holidayCountMutate } = useGetAllHolidayCountForDate();
  const[showHolidayCount, setShowHolidayCount] = useState(false);
  const[holidayCount, setHolidayCount] = useState(0);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    // Mettez à jour l'état local avec la valeur de l'input
    setDate(evt.target.value);
  };

  const onClick = ()=> {
     holidayCountMutate(date, {
      onError: () => alert('An error occurred'),
      onSuccess: (data) => {
        setHolidayCount(data)
        setShowHolidayCount(true)
      }
    });
  };

  return (
    <PageWrapper>
      <div className="page-size flex w-full justify-center items-center background">
        <div className="lg:w-4/6 w-11/12 p-16 bg-white rounded-2xl box-shadow">
          <div className="flex flex-col">
            <p className="text-blue-800 font-bold lg:text-3xl text-xl">Welcome to</p>
            <div>
              <h1 className="lg:text-8xl text-5xl font-bold lg:mb-0 mb-4">
                Holiday
                <span className="text-blue-800">.</span>
              </h1>
            </div>
            <p className="mt-3.5 lg:text-3xl text-lg font-bold">Rejoingnez nos {countParticipants} membres actifs !</p>
          </div>

          <div className="h-1/2 flex flex-col mt-12">
              <p className="font-semibold">Découvrez le nombre de vacances en cours à une date donnée !</p>
              {showHolidayCount && (
                  <p className="font-semibold text-blue-800"> Il y a {holidayCount} vacance.s prévue.s durant la date du{" "}
                    {dayjs(date).format("DD/MM/YYYY")}.
                  </p>
              )}

            <form className="mb-6 flex-col flex">
              <input id="date"
                     type="date"
                     className="bg-gray-100 text-gray-900 mt-3.5 p-3 rounded-lg focus:outline-none focus:shadow-outline my-1 mr-2 flex-grow w-1/4"
                     onChange={onChange} value={date} />
              <button
                type="button"
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full w-1/6 mt-3.5"
                onClick={onClick}
              >
                Chercher
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
