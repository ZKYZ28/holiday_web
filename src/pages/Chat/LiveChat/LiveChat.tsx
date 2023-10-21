import MessageChat from "../GroupChat/MessageChat/MessageChat.tsx";
import {useMessages} from "../../../provider/MessagesProvider.tsx";
import {useAuth} from "../../../provider/AuthProvider.tsx";
import {useEffect, useRef} from "react";
const LiveMessage = () => {
  const { messages } = useMessages();
  const { user } = useAuth();
  const messagesRef = useRef(null);

  useEffect(() => {
      // Scroll to the most recent message when new messages are added
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  return (
      <div className="flex flex-col h-full overflow-x-auto mb-4" ref={messagesRef}>
          <div className="flex flex-col h-full">
              <div className="grid grid-cols-12 gap-y-2">
                  {messages.map((m, index) => (
                      <MessageChat key={index} isOwnMessage={m.participantId == user!.id} message={m}/>
                  ))}
              </div>
          </div>
      </div>
  );
};

export default LiveMessage;
