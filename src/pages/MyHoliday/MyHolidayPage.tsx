import TitleH2 from '../../components/common/TiteH2.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';
import {NavLink, useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MyHolidayMembers from './MyHolidayMembers/MyHolidayMembers.tsx';
import MyHolidayColumn from './MyHolidayColumn/MyHolidayColumn.tsx';
import sun from '../../assets/imgs/icons/sun.png';
import MyHolidayCard from './MyHolidayCard/MyHolidayCard.tsx';
import {useGetHolidayById} from "../../api/Queries/HolidayQueries.ts";

function MyHolidayPage() {
  const { id } = useParams();
  const { data} = useGetHolidayById(id);

  console.log("ID " + id)
  console.log(data)

  return (
    <PageWrapper>
      <PageContent pageTitle="Monaco">
        <div>
          <TitleH2 text="28/03/2022" />
          <div className="w-full flex flex-col items-center md:flex-row md:flex-wrap md:justify-between">
            <div className="w-full md:w-5/12 bg-white shadow-lg rounded-sm border border-gray-200 h-96 overflow-x-scroll">
              <header className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                <h2 className="text-xl capitalize lg:text-2xl text-blue-800 font-bold ">Participant(s)</h2>
                <button>
                  <FontAwesomeIcon className="text-blue-800" icon={faPlus} size="xl" />
                </button>
              </header>
              <div className="p-3">
                <div>
                  <table className="table-auto w-full">
                    <thead className="text-xs capitalize font-semibold text-gray-400 bg-gray-50">
                      <tr>
                        <MyHolidayColumn name="Nom" />
                        <MyHolidayColumn name="Email" />
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      <MyHolidayMembers
                        name="Alex Shatov"
                        email="alex.shatov@gmail.com"
                        srcImage="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg"
                      />
                      <MyHolidayMembers
                        name="Philip Harbach"
                        email="philip.h@gmail.com"
                        srcImage="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-06.jpg"
                      />
                      <MyHolidayMembers
                        name="Mirko Fisuk"
                        email="mirkofisuk@gmail.com"
                        srcImage="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-08.jpg"
                      />
                      <MyHolidayMembers
                        name="Burak Long"
                        email="burak.long@gmail.com"
                        srcImage="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg"
                      />
                      <MyHolidayMembers
                        name="Burak Long"
                        email="burak.long@gmail.com"
                        srcImage="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg"
                      />
                      <MyHolidayMembers
                        name="Burak Long"
                        email="burak.long@gmail.com"
                        srcImage="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg"
                      />
                      <MyHolidayMembers
                        name="Burak Long"
                        email="burak.long@gmail.com"
                        srcImage="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg"
                      />
                      <MyHolidayMembers
                        name="Burak Long"
                        email="burak.long@gmail.com"
                        srcImage="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-09.jpg"
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="w-full mt-10 md:mt-0 md:w-5/12 bg-white shadow-lg rounded-sm border border-gray-200 h-96 overflow-y-scroll">
              <header className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
                <h3 className="text-base capitalize lg:text-xl text-blue-800 font-bold ">Méteo prévue</h3>
              </header>
              <div className="flex flex-row flex-wrap overflow-y-scroll">
                <img src={sun} width="150" />
                <img src={sun} width="150" />
                <img src={sun} width="150" />
                <img src={sun} width="150" />
                <img src={sun} width="150" />
                <img src={sun} width="150" />
                <img src={sun} width="150" />
                <img src={sun} width="150" />
              </div>
            </div>
          </div>

          <div className="w-full bg-white shadow-lg rounded-sm border border-gray-200 mt-10">
            <header className="flex justify-between items-center px-5 py-4 border-b border-gray-100 ">
              <h2 className="text-xl capitalize lg:text-2xl text-blue-800 font-bold ">Activités prévues</h2>
              <NavLink to='/holidays/activity'>
                <FontAwesomeIcon className="text-blue-800" icon={faPlus} size="xl" />
              </NavLink>
            </header>
            <div className="overflow-y-scroll">
              <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 p-3" style={{ height: '50rem' }}>
                <MyHolidayCard />
                <MyHolidayCard />
                <MyHolidayCard />
                <MyHolidayCard />
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    </PageWrapper>
  );
}

export default MyHolidayPage;
