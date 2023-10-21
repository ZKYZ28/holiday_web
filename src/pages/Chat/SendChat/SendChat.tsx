import {ChangeEvent, useState} from "react";
import {useMessages} from "../../../provider/MessagesProvider.tsx";
import {useAuth} from "../../../provider/AuthProvider.tsx";

const SendChat = ({holidayId}: {holidayId: string}) => {
  const { user } = useAuth();
  const { sendMessage } = useMessages();
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
   e.preventDefault();
   sendMessage(user, holidayId, message);
   setMessage('');
  };

  // Méthode appelée lorsqu'il y a un changement dans le champ de texte
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
        <div className="flex-grow ml-4">
          <div className="relative w-full">
            <input
              type="text"
              value={message}
              onChange={handleChange}
              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
            />
          </div>
        </div>

        <div className="ml-4">
          <button type="submit" className="flex items-center justify-center bg-blue-800 hover:bg-blue-700 rounded-xl text-white px-4 py-1 flex-shrink-0">
            <span>Send</span>
            <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendChat;
