import PageWrapper from '../../components/common/PageWrapper.tsx';

import { useGetParticipantsCount } from '../../api/Queries/ParticipantQueries.ts';
import { ChangeEvent, useState } from 'react';
import { useGetAllHolidayCountForDate } from '../../api/Queries/HolidayQueries.ts';
import { formattedDate } from '../../components/common/utils/dateUtils.ts';
import dayjs from 'dayjs';
import {ParticipantCount} from "../../api/Models/CountParticipant.ts";

const HomePage = () => {
  const { data: countParticipantsRegistered } = useGetParticipantsCount();
  const { mutate: holidayCountMutate } = useGetAllHolidayCountForDate();

  const [date, setDate] = useState(formattedDate);
  const [showHolidayCount, setShowHolidayCount] = useState(false);
  const [countParticipants, setCountParticipants] = useState<ParticipantCount[]>([]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setDate(evt.target.value);
  };

  const onClick = () => {
    holidayCountMutate(date, {
      onError: () => alert('Désolé, nous envons rencontré une erreur.'),
      onSuccess: (data) => {
        setCountParticipants(data);
        setShowHolidayCount(true);
      },
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
            <p className="mt-3.5 lg:text-3xl text-lg font-bold">Rejoingnez nos {countParticipantsRegistered} membres actifs !</p>
          </div>

          <div className="h-1/2 flex flex-col mt-12">
            <p className="font-semibold">Découvrez le nombre de participants en vacances par pays pour une date!</p>
            {showHolidayCount && (
              <div className="mt-3.5">
                <p className="font-semibold text-blue-800">
                  {' '}
                  Voici le nombre de participants en vacances pour la date du {dayjs(date).format('DD/MM/YYYY')} :
                </p>

                {countParticipants.map((participant, index) => (
                  <div key={index}>
                    <p className="font-semibold text-blue-800">{`${participant.country} : ${participant.participants} participant(s).`}</p>
                  </div>
                ))}
              </div>

            )}

            <form className="mb-6 flex-col flex">
              <input
                id="date"
                type="date"
                className="bg-gray-100 text-gray-900 mt-3.5 p-3 rounded-lg focus:outline-none focus:shadow-outline my-1 mr-2 flex-grow w-1/4"
                onChange={onChange}
                value={date}
              />

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
