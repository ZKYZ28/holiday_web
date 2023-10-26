import { Message } from '../../../../api/Models/Message.ts';
import dayjs from 'dayjs';

const MessageChat = ({ isOwnMessage, message }: { isOwnMessage: boolean; message: Message }) => {
  return (
    <div className={isOwnMessage ? 'col-start-6 col-end-13 p-3 rounded-lg' : 'col-start-1 col-end-8 p-3 rounded-lg'}>
      <div className={`flex flex-row items-center ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
        <div className="block">
          <div className={`flex flex-row items-center ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`relative ml-3 text-sm ${
                isOwnMessage ? 'bg-indigo-100' : 'bg-white'
              } py-2 px-4 shadow rounded-xl inline-block`}
            >
              <p className={`${isOwnMessage ? 'text-right' : 'text-left'}`}>{message?.content}</p>
            </div>
          </div>
          <p className={`${isOwnMessage ? 'text-right' : 'text-left'} text-gray-400`}>
            {message.participant.firstName} {message.participant.lastName} :{' '}
            {dayjs(message.sendAt).format('DD/MM/YYYY à HH:mm')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageChat;
