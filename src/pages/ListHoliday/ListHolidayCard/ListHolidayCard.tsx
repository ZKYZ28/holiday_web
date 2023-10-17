import ButtonLink from '../../../components/common/ButtonLink.tsx';
import calendar from '../../../assets/imgs/icons/calendar.png';
import peoples from '../../../assets/imgs/icons/peoples.png';
import location from '../../../assets/imgs/icons/location.png';
import bgCard from '../../../assets/imgs/bg/bg.jpg';
import * as dayjs from 'dayjs';


function ListHolidayCard({ holiday }) {
  console.log(holiday)


  const id = `/holidays/${holiday.id}`;
  return (
    <div className="lg:flex bg-white rounded-2xl">
      <img className="object-cover w-full h-100 rounded-lg lg:w-64" src={bgCard} alt="" />

      <div className="flex flex-col justify-between p-6 lg:mx-6">
        <h3 className="text-xl md:text-3xl font-bold text-blue-800 ">{holiday.name}</h3>
        <p className="my-8 text-base lg:text-lg"> {holiday.description} </p>

        <ul className="flex flex-col justify-around">
          <div className="flex flex-row items-center mb-1.5">
            <img src={calendar} alt="CALENDAR" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl ">{dayjs(holiday.startDate).format("DD-MM-YYYY")}</li>
          </div>

          <div className="flex flex-row items-center mb-1.5">
            <img src={peoples} alt="PEOPLES" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl">X</li>
          </div>

          <div className="flex flex-row items-center mb-1.5">
            <img src={location} alt="LOCATION" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl ">{holiday.location.locality}, {holiday.location.country}</li>
          </div>
        </ul>

        <div className="flex justify-center items-center mt-5">
          <ButtonLink text="Voir plus" to={id} />
        </div>
      </div>
    </div>
  );
}

export default ListHolidayCard;
