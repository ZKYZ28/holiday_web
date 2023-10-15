import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons";
const HolidayInvitation = () => {

    return (
        <li>
            <div className="flex justify-between items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-gray-200 group hover:shadow">
                <div>
                    <span className="flex-1 ml-3 whitespace-nowrap text-lg text-blue-800">MetaMask</span>
                </div>

                <div>
                    <FontAwesomeIcon icon={faCheck} size="lg" className="mr-2" />
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </div>
            </div>
        </li>
    );
};

export default HolidayInvitation;
