import ButtonLink from '../../../components/common/ButtonLink.tsx';
import calendar from '../../../assets/imgs/icons/calendar.png';
import peoples from '../../../assets/imgs/icons/peoples.png';
import location from '../../../assets/imgs/icons/location.png';
import bgCard from '../../../assets/imgs/bg/bg.jpg';

function ListHolidayCard() {
  return (
    <div className="lg:flex bg-white rounded-2xl">
      <img className="object-cover w-full h-100 rounded-lg lg:w-64" src={bgCard} alt="" />

      <div className="flex flex-col justify-between p-6 lg:mx-6">
        <h3 className="text-xl md:text-3xl font-bold text-blue-800 ">ZozoParty</h3>
        <p className="my-8 text-base lg:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt arcu diam.Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.
        </p>

        <ul className="flex flex-col justify-around">
          <div className="flex flex-row items-center mb-1.5">
            <img src={calendar} alt="CALENDAR" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl ">28/03/2023</li>
          </div>

          <div className="flex flex-row items-center mb-1.5">
            <img src={peoples} alt="PEOPLES" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl">28/03/2023</li>
          </div>

          <div className="flex flex-row items-center mb-1.5">
            <img src={location} alt="LOCATION" className="w-5 mr-4" />
            <li className="font-bold text-base lg:text-xl ">28/03/2023</li>
          </div>
        </ul>

        <div className="flex justify-center items-center mt-5">
          <ButtonLink text="Voir plus" to="/myholiday" />
        </div>
      </div>
    </div>
  );
}

export default ListHolidayCard;
