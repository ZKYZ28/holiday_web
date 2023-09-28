import ButtonLink from "../../components/common/ButtonLink.tsx"
import TitlePage from "../../components/common/TitlePage.tsx"
import ListHolidayCard from "./ListHolidayCard/ListHolidayCard.tsx";
const ListHoliday = () => {
    return (
        <>
            <section className="bg-gray-100">
                <div className="container px-6 py-10 mx-auto">

                    <TitlePage text="Mes vacances"/>
                    <ButtonLink text="Encoder"/>
                    <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">

                    <ListHolidayCard />
                    <ListHolidayCard />
                    <ListHolidayCard />
                    <ListHolidayCard />
                    <ListHolidayCard />
                    <ListHolidayCard />

                    </div>
                </div>
            </section>
        </>
    );
};

export default ListHoliday;