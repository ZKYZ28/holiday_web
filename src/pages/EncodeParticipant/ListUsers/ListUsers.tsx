import { userGetParticipants } from '../../../api/Queries/ParticipantQueries.ts';
import { FC, useState } from 'react';
import { faTimes, faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateInvitations } from '../../../api/Queries/InvitationQueries.ts';
import { useAuth } from '../../../provider/AuthProvider.tsx';
import { Participant } from '../../../api/Models/Participant.ts';
import { InvitationMutation } from '../../../api/Models/Invitation.ts';
type ListProps = {
  input: string;
};

const ListUsers: FC<ListProps> = ({ input }) => {
  // RECUPERATION DE TOUS LES PARTICIPANTS
  const { data: participants, isLoading }: { data: Participant[]; isLoading: boolean } = userGetParticipants();
  const { user } = useAuth();
  const { id } = useParams();
  const { data: participants, isLoading }: { data: Participant[]; isLoading: boolean } = usetGetParticipants(id);
  const navigate = useNavigate();

  // AJOUT ET SUPRESSION DES PARTICIPANTS DANS LES PARTICIPANTS AJOUTES
  const [participantsAdded, setParticipantsAdded] = useState<Participant[]>([]);
  const addParticipantToAddedList = (participant: Participant) => {
    // Vérifiez si le participant n'est pas déjà dans participantsAdded
    const isParticipantAlreadyAdded = participantsAdded.find(
      (addedParticipant: Participant) => addedParticipant.id === participant.id
    );

    if (!isParticipantAlreadyAdded) {
      setParticipantsAdded([...participantsAdded, participant]);
    }
  };

  const removeParticipantFromAddedList = (participantId: string) => {
    const updatedParticipants = participantsAdded.filter(
      (participant: Participant) => participant.id !== participantId
    );
    setParticipantsAdded(updatedParticipants);
  };

  // FILTRE DES PARTICIPANTS EN FONCTION DU INPUT
  const filterParticipants = (participants: Participant[], input: string): Participant[] => {
    const lowercaseFilterText = input.toLowerCase();

    const filteredParticipants = participants.filter((participant) => {
      const fullName = `${participant.lastName} ${participant.firstName}`.toLowerCase();
      return fullName.includes(lowercaseFilterText);
    });

    return filteredParticipants;
  };

  const filteredData = filterParticipants(participants, input);

  // CALL API
  const { mutate: mutateInvitations } = useCreateInvitations();

  // CREATION DES INVITATIONS
  const handleSubmit = async () => {
    const invitations: InvitationMutation[] = participantsAdded.map((participant: Participant) => ({
      holidayId: id ?? '', // TODO : value '' is good ?
      participantId: participant.id,
    }));

    await mutateInvitations(invitations, {
      onError: () => alert('An error occurred'),
      onSuccess: () => navigate(`/holidays/${id}`),
    });
  };

  return (
    <div id="addedParticipant" className="mb-6">
      <div className="w-full bg-blue-800 rounded-t-lg p-2 mb-4">
        <p className="text-white font-bold">Participants à ajouter</p>
      </div>

      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div>
          <ul className="flex w-full flex-wrap justify-center max-h-52 overflow-y-scroll">
            {participantsAdded.map((participant: Participant) => (
              <li
                className="text-blue-800 hover:text-white border border-blue-700 hover:border-red-900 hover-bg-red-700 focus-ring-4 focus-outline-none focus-ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-2 mb-2"
                key={participant.id}
                onClick={() => removeParticipantFromAddedList(participant.id)}
              >
                {participant.firstName} {participant.lastName}{' '}
                <FontAwesomeIcon icon={faTimes} size="lg" className="ml-2.5" />
              </li>
            ))}
          </ul>

          <div className="w-full bg-blue-800 rounded-t-lg p-2">
            <p className="text-white font-bold">Participants</p>
          </div>

          <ul className=" max-h-52 overflow-y-scroll w-full mb-4 ">
            {filteredData
              .filter((participant) => {
                return participant.id != user?.id!;
              })
              .map((participant) => (
                <li
                  key={participant.id}
                  className="border-b-2 mb-2 mt-2 cursor-pointer pb-2"
                  onClick={() => addParticipantToAddedList(participant)}
                >
                  <FontAwesomeIcon icon={faAdd} size="lg" className="mx-2.5" /> {participant.firstName}{' '}
                  {participant.lastName} ({participant.email})
                </li>
              ))}
          </ul>
        </div>
      )}

      <div className="flex w-full justify-center">
        <button
          className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
          onClick={handleSubmit}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

export default ListUsers;
