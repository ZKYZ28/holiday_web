import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from "@fortawesome/free-solid-svg-icons";

type MyHolidayMembersProps = {
  name: string;
  email: string;
};

function MyHolidayMember({ name, email }: MyHolidayMembersProps) {
  return (
    <tr>
      <td className="p-2 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3 flex justify-center items-center">
            <FontAwesomeIcon icon={faUser} size="xl" />
          </div>
          <div className="font-medium text-gray-800">{name}</div>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{email}</div>
      </td>
    </tr>
  );
}

export default MyHolidayMember;
