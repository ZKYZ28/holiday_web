import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MyHolidayMember from './MyHolidayMember.tsx';
import MyHolidayColumn from '../MyHolidayColumn/MyHolidayColumn.tsx';
import { NavLink } from 'react-router-dom';
import Loading from '../../../components/common/Loading.tsx';
import { Participant } from '../../../api/Models/Participant.ts';
import {useParams} from "react-router-dom";

function MyHolidayListMembers({ participants }: { participants: Participant[] | undefined }) {
  const { id } = useParams();
    return (
        <div className="w-full md:w-5/12 bg-white shadow-lg rounded-sm border border-gray-200 h-96 overflow-x-scroll">
            <header className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                <h2 className="text-xl capitalize lg:text-2xl text-blue-800 font-bold ">Participant(s)</h2>
                <NavLink to={`/holidays/participant/${id}`}>
                    <FontAwesomeIcon className="text-blue-800" icon={faPlus} size="xl" />
                </NavLink>
            </header>
            <div className="p-3">

              <div>
                {participants ? (
                  <table className="table-auto w-full">
                    <thead className="text-xs capitalize font-semibold text-gray-400 bg-gray-50">
                    <tr>
                      <MyHolidayColumn name="Nom"/>
                      <MyHolidayColumn name="Email"/>
                    </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100 overflow-y-scroll">
                    {participants && participants.length > 0 && participants.map((participant: Participant) => (
                      <MyHolidayMember
                        key={participant.id}
                        name={`${participant.firstName} ${participant.lastName}`}
                        email={participant.email}
                      />
                    ))}
                    </tbody>
                  </table>
                ) : (
                  <Loading/>
                )}
              </div>

            </div>
        </div>
    );
}

export default MyHolidayListMembers;
