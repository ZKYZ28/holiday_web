import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useMemo, useState, useRef} from 'react';
import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';
import { UserAuthentificated } from '../api/Models/UserAuthentificated.ts';
import { Message } from '../api/Models/Message.ts';

type MessagesContextType = {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  joinRoom: (holidayId: string, user: UserAuthentificated) => void;
  sendMessage: (userName: UserAuthentificated, holidayId: string, message: string) => void;
  leaveRoom: (holidayId: string, user: UserAuthentificated) => void;
};

const defaultValue: MessagesContextType = {
  messages: [],
  setMessages: () => {},
  joinRoom: () => {},
  sendMessage: () => {},
  leaveRoom: () => {},
};

export const MessagesContext = createContext<MessagesContextType>(defaultValue);

const MessagesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const connectionRef = useRef<HubConnection | null>(null);


  // METHODE POUR QUI PEREMT DE REJOINDRE UN CHAT
  const joinRoom = async (holidayId: string, user: UserAuthentificated) => {
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_BASE_API}/chat`)
        .configureLogging(LogLevel.Information)
        .build();

      connectionRef.current = newConnection;

      // REGISTER DES LISTENERS
      newConnection!.on('ReceiveWelcomeMessage', (messageReceive: Message) => {
        setMessages((messages: Message[]) => [...messages, messageReceive]);
      });

      newConnection!.on('ClearMessages', () => {
        setMessages([]);
      });

      newConnection!.on('ReceiveHistoryMessage', (messageHistory: Message[]) => {
        setMessages((messages: Message[]) => [...messages, ...messageHistory]);
      });

      newConnection!.on('ReceiveSendMessage', (messageReceive: Message) => {
        setMessages((messages) => [...messages, messageReceive]);
      });

      await newConnection!.start();

      await newConnection!.invoke('JoinRoom', holidayId, user);

    } catch (e) {
      console.log(e)
    }
  };

  // METHODE POUR ENVOYER UN MESSAGE DANS LE CHAT
  const sendMessage = async (user: UserAuthentificated, holidayId: string, message: string) => {
    try {
      await connectionRef.current!.invoke('SendMessage', user, holidayId, message);
    } catch (e) {
      console.log(e)
    }
  };

  const leaveRoom = async (holidayId: string, user: UserAuthentificated) => {
    try {
      await connectionRef.current!.invoke('LeaveHolidayRoom', holidayId, user);
      await connectionRef.current!.stop();
    } catch (e) {
      console.log(e)
    }
  };

  const contextValue = useMemo(
    () => ({
      messages,
      setMessages,
      joinRoom,
      sendMessage,
      leaveRoom,
    }),
    [messages]
  );

  return <MessagesContext.Provider value={contextValue}>{children}</MessagesContext.Provider>;
};

export const useMessages = () => {
  return useContext(MessagesContext);
};

export default MessagesProvider;
