import chat from '../../assets/imgs/others/chat.png';
import GroupChat from './GroupChat/GroupChat.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import LiveChat from "./LiveChat/LiveChat.tsx";
import SendChat from "./SendChat/SendChat.tsx";
import {useAuth} from "../../provider/AuthProvider.tsx";
import {useMessages} from "../../provider/MessagesProvider.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import {useGetAllHolidayByParticipant} from "../../api/Queries/HolidayQueries.ts";

const ChatPage = () => {

  const { user } = useAuth();
  const { joinRoom } = useMessages()
  const { data: holidays } = useGetAllHolidayByParticipant(user!.id);
  const [activeGroupChat, setActiveGroupChat]: [activeGroupChat: string, setActiveGroupChat: Dispatch<SetStateAction<string>>] = useState('');
  const [holidayId, setHolidayId]: [holidayId: string, setHolidayId: Dispatch<SetStateAction<string>>] = useState(holidays[0]?.id);

  const handleGroupChatClick = (holidayId : string) => {
    setActiveGroupChat(holidayId);
    joinRoom(holidayId, user!)
    setHolidayId(holidayId);
  };

  return (
    <PageWrapper>
      <div className="flex h-screen antialiased text-gray-00">
        <div className="flex flex-row w-full overflow-x-hidden">
          {/* Left card with Image + Name*/}
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-col items-center bg-gray-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
              <div className="h-20 w-20 rounded-full border overflow-hidden">
                <img src={chat} alt="ChatPage" className="h-full w-full" />
              </div>
              <div className="text-2xl mt-2 font-bold italic">
                Cat <span className="text-blue-800">Chat</span>
              </div>
            </div>

            {/* Active conversations*/}
            <div className="flex flex-col mt-8 ">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold text-xl">Vacances</span>
              </div>

              {/* List of groups*/}
              <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
                {holidays.map((holiday) => (
                  <GroupChat key={holiday.id} text={holiday.name} onClick={() => handleGroupChatClick(holiday.id)}  isActive={holiday.id === activeGroupChat} />
                ))}
              </div>
            </div>
          </div>

          {/* Right part*/}
          <div className="flex flex-col flex-auto h-5/6 p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              {/*LIVE CHAT*/}
              <LiveChat/>
              {/* Send message part*/}
              <SendChat holidayId={holidayId} />
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
};

export default ChatPage;
