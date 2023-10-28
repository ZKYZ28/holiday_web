import {useParams} from "react-router-dom";

import Loading from "../../../components/common/Loading.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Participate} from "../../../api/Models/Participate.ts";
import {useDeleteParticipate, useGetAllParticipatesByActivity} from "../../../api/Queries/ParticipateQueries.ts";
import {useState} from "react";
import Modal from "../../../components/Modal/Modal.tsx";

const MembersActivity = () => {
    const { id} = useParams();
    const {data : participates, isLoading: isLoadingParticipates}: {data: Participate[], isLoading: boolean} = useGetAllParticipatesByActivity(id!)
    const [showModalInvitation, setShowModalInvitation] = useState(false);
    const [selectedParticipate, setSelectedParticipate] = useState<Participate | null>(null);
    const {mutate: mutateParticipate} = useDeleteParticipate();

    const openModalDelete = (participate: Participate): void => {
        setSelectedParticipate(participate);
        setShowModalInvitation(true);
    };

    const closeModalDelete = (): void => {
        setShowModalInvitation(false);
    };

    function handleDeleteClick() {
        if (selectedParticipate) {
            mutateParticipate(
                selectedParticipate,
                { onError: () => alert('An error occurred'), onSuccess : () => closeModalDelete()}
            )
        }
    }

    return (
        <div>
            {isLoadingParticipates ? (
                <Loading />
            ) : (
                <div>
                    <div className="w-full bg-blue-800 rounded-t-lg p-2 mt-10">
                        <p className="text-white font-bold">Participants ajoutés</p>
                    </div>

                    <ul className="max-h-52 overflow-y-scroll w-full mb-4">
                        {participates.map((participate) => (
                            <li
                                key={participate.participant.id}
                                className="border-b-2 mb-2 mt-2 cursor-pointer pb-2 flex justify-between px-3"
                            >
                                {participate.participant.lastName} ({participate.participant.email})
                                <FontAwesomeIcon icon={faTrash} size="xl" className="text-red-600 ml-3 cursor-pointer" onClick={() => openModalDelete(participate)}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {showModalInvitation && (
                <Modal
                    show={showModalInvitation}
                    onClose={closeModalDelete}
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
