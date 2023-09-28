import ButtonLink from "../common/ButtonLink.tsx";
import './Header.css';
import Point from "../../components/common/Point.tsx"

function Header() {
    return (
        <>
            <header className="bg-white w-full flex md:flex-row flex-col justify-between items-center alig px-12 custom-height border-b-2 border-blue-600">
                <div><h2 className="font-bold text-2xl mt-3 md:m-0">Holiday<Point/></h2></div>

                <ul className="flex justify-around w-full md:w-1/3 mb-3 md:m-0">
                    <ButtonLink text="Contact"/>
                    <ButtonLink text="Login"/>
                    <ButtonLink text="Register"/>
                </ul>
            </header>
        </>
    )
}

export default Header