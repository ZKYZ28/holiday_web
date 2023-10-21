import PageWrapper from '../../components/common/PageWrapper.tsx';

import './HomePage.css';
import { usetGetParticipantsCount } from '../../api/Queries/ParticipantQueries.ts';
import React, { useState } from 'react';
import { useGetAllHolidayCountForDate } from '../../api/Queries/HolidayQueries.ts';

const HomePage = () => {
  const { data: countParticipants, isLoading } = usetGetParticipantsCount();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const defaultDate = `${year}-${month}-${day}`;
  const [date, setDate] = useState(defaultDate);

  const onChange = (evt) => {
    setDate(evt.target.value);
  };

  const onClick = (evt) => {
    const { data: dateCount, isLoading } = useGetAllHolidayCountForDate(date);
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
            <p className="mt-3.5 lg:text-3xl text-lg font-bold">
              Rejoingnez nos {countParticipants} membres actifs  !
            </p>
          </div>

          <div className="h-1/2 flex flex-col justify-around">

            <form className="mb-6 mt-12">
              <input id="date" type="date" onChange={onChange} value={date}/>
              <button
                type="button"
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                onClick={onClick}
              >Chercher</button>
            </form>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
