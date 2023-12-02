import {useParams} from "react-router-dom";

import Loading from "../../../components/common/Loading.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import Modal from "../../../components/Modal/Modal.tsx";
import {Participant} from "../../../api/Models/Participant.ts";
import {GetParticipantsByActivity, useDeleteParticipate} from "../../../api/Queries/ActivityQueries.ts";

const MembersActivity = () => {
    const { id} = useParams();
    const {data : activityParticipants, isLoading: isLoadingActivityParticipants}: {data: Participant[], isLoading: boolean} = GetParticipantsByActivity(id!, true)
    const [showModalInvitation, setShowModalInvitation] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
    const {mutate: mutateParticipate} = useDeleteParticipate();

    const openModalDelete = (participant: Participant): void => {
      setSelectedParticipant(participant);
        setShowModalInvitation(true);
    };

    const closeModalDelete = (): void => {
        setShowModalInvitation(false);
    };

    function handleDeleteClick() {
        if (selectedParticipant) {
            mutateParticipate( {activityId : id!, participantId : selectedParticipant.id},
            { onError: () => alert('Une erreur est survenue lors de la suppression de la participation'), onSuccess : () => closeModalDelete()}
            )
        }
    }

    return (
        <div>
            {isLoadingActivityParticipants ? (
                <Loading />
            ) : (
                <div>
                    <div className="w-full bg-blue-800 rounded-t-lg p-2 mt-10">
                        <p className="text-white font-bold">Participants ajoutés</p>
                    </div>

                    <ul className="max-h-52 overflow-y-scroll w-full mb-4">
                        {activityParticipants.map((participant) => (
                            <li
                                key={participant.id}
                                className="border-b-2 mb-2 mt-2 cursor-pointer pb-2 flex justify-between px-3"
                            >
                                {participant.lastName} ({participant.email})
                                <FontAwesomeIcon icon={faTrash} size="xl" className="text-red-600 ml-3 cursor-pointer" onClick={() => openModalDelete(participant)}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showModalInvitation && (
                <Modal
                    show={showModalInvitation}
                    onClose={closeModalDelete}
                    title = "Supprimer"
                >
                    <div className="flex flex-col justify-center items-center w-full">
                        <p className="text-center">Etes-vous sûr de vouloir supprimer ce participant?</p>

                        <div className="flex justify-around mt-6 w-full">
                            <button
                                onClick={handleDeleteClick}
                                type="button"
                                className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                            >
                                Confirmer
                            </button>

                            <button
                                onClick={closeModalDelete}
                                type="button"
                                className="inline-block bg-red-600 hover-bg-red-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};
export default MembersActivity;
