import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Invitation } from '../../../api/Models/Invitation.ts';
import { useAcceptInvitation, useRefuseInvitation } from '../../../api/Queries/InvitationQueries.ts';

const HolidayInvitation = ({ invitation }: { invitation: Invitation }) => {
  const { mutate: mutateAcceptInvitation } = useAcceptInvitation();

  const handleAcceptClick = async () => {
    await mutateAcceptInvitation(invitation.id, {
      onError: () => alert('Une erreur est survenue quand vous avez accepté l\'invitation.'),
    });
  };

  const { mutate: mutateRefuseInvitation } = useRefuseInvitation();
  const handleRefuseClick = async () => {
    await mutateRefuseInvitation(invitation.id, {
      onError: () => alert('Une erreur est survenue quand vous avez refusé l\'invitation.'),
    });
  };

  return (
    <li>
      <div className="flex justify-between items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-gray-200 group hover:shadow">
        <div>
          <span className="flex-1 ml-3 whitespace-nowrap text-lg text-blue-800">{invitation.holiday.name}</span>
        </div>

        <div>
          <button onClick={handleAcceptClick}>
            <FontAwesomeIcon icon={faCheck} size="lg" className="mr-2" />
          </button>
          <button onClick={handleRefuseClick}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default HolidayInvitation;
