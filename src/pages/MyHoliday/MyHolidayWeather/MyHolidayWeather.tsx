import ErrorMessage from "../../../components/common/ErrorMessage.tsx";
import Loading from "../../../components/common/Loading.tsx";
import * as dayjs from "dayjs";
import drop from "../../../assets/imgs/icons/drop.png";
import {usetGetWeather} from "../../../api/Queries/WeatherQueries.ts";
import {useState} from "react";

function MyHolidayWeather({id}) {
  const { data : weatherData , isLoading: weatherIsLoading, error : weatherError  } = usetGetWeather(id);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  return (
    <div className="w-full mt-10 md:mt-0 md:w-5/12 bg-white shadow-lg rounded-sm border border-gray-200 h-96 overflow-y-scroll">
      <header className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
        <h3 className="text-base capitalize lg:text-xl text-blue-800 font-bold ">Méteo prévue</h3>
      </header>
      <div className="flex flex-row flex-wrap">
        {weatherError ? (
          <ErrorMessage message={weatherError.response.data} />
        ) : (
          <>
            {weatherIsLoading ? (
              <Loading />
            ) : (
              <>
                {weatherData.weatherDays && weatherData.weatherDays.length > 0 ? (
                  <>
                    <div id="currentDay" className="flex w-full justify-around items-center my-4">
                      <div>
                        <p className="text-xl">Météo pour le {dayjs(weatherData?.weatherDays[selectedDayIndex]?.date).format("DD-MM-YYYY")}.</p>
                        <p className="text-xs">(Dernière mise à jour faite à {dayjs(weatherData?.currentDay?.date).format("HH:mm")} heures.)</p>
                        <p className="mt-2.5 text-blue-600 font-bold"> {weatherData?.weatherDays[selectedDayIndex]?.condition.description} </p>
                      </div>
                      <img className="w-24 h-24" src={weatherData?.weatherDays[selectedDayIndex].condition.iconPath} alt="IMAGE"  />
                    </div>

                    <div id="currentDayHour" className="w-full overflow-x-scroll">
                      <div className="mb-4 flex w-full">
                        {weatherData?.weatherDays[selectedDayIndex]?.weatherByHour?.map((weatherHour, index) => (
                          <div className="flex flex-col mx-2 rounded-2xl bg-blue-50 p-2 w-1/4" key={index}>
                            <p className="text-sm">{dayjs(weatherHour.dateAndTime).format("HH:mm")}</p>
                            <img src={weatherHour.pathImage} alt="IMAGE_TEMP"/>
                            <p className="whitespace-nowrap text-sm">{weatherHour.temp} °C</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <table className="w-full mt-3.5 m-3">
                      {weatherData?.weatherDays?.map((weatherDay, index) => (
                        <tr className="flex justify-around cursor-pointer border-solid" key={index} onClick={() => setSelectedDayIndex(index)}>
                          <td className="td-width ">{dayjs(weatherDay.date).format("dddd")}</td>
                          <td className="td-width"><img className="w-2.5 h-2.5" src={drop} alt="DROP" /> {weatherDay.riskOfRain} %</td>
                          <td className="td-width"><img className="w-10 h-10" src={weatherDay.condition.iconPath} alt="IMAGE_TIME"/></td>
                          <td className="td-width">{weatherDay.maxTemp}°</td>
                          <td className="td-width">{weatherDay.minTemp}°</td>
                        </tr>
                      ))}
                    </table>
                  </>
                ) : (
                  <Loading />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MyHolidayWeather;
