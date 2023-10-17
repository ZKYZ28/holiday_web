import HolidayInvitation from "../HolidayInvitation/HolidayInvitation.tsx";
import ErrorMessage from "../../../components/common/ErrorMessage.tsx";
import Loading from "../../../components/common/Loading.tsx";


const ModalInvitation = (props) => {

  return (
    <div style={{ display: props.show ? 'block' : 'none' }} id="crypto-modal" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden bg-blue-800 p-1 rounded-lg shadow-lg w-[400px]">
      <div className="relative w-full max-w-md max-h-full">

       {/*Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-white">
          <button type="button" onClick={props.onClose} className="cursor-pointer absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-white rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-blue-800 dark:hover:text-white" data-modal-hide="crypto-modal">
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          {/*Modal header*/}
          <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-base font-bold text-blue-800 lg:text-xl">
              Invitations
            </h3>
          </div>

          {/*Modal body*/}
          <div className="p-6">
            {props.invitationsError ? (
              <ErrorMessage message={props.invitationsError.response.data} />
            ) : (
              <>
                {props.invitationsIsLoading ? (
                  <Loading />
                ) : (
                  <>
                    {props.invitations.length === 0 ? (
                      <p>Aucune invitation disponible.</p>
                    ) : (
                      <ul className="my-4 space-y-3 overflow-y-scroll h-52 pr-4">
                        {props.invitations.map((invitation) => (
                          <HolidayInvitation key={invitation.Id} invitation={invitation} />
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalInvitation;
