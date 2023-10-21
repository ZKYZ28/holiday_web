import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useMemo, useState} from "react";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {UserAuthentificated} from "../api/Models/UserAuthentificated.ts";
import {Message} from "../api/Models/Message.ts";

type MessagesContextType = {
  messages: any[];
  setMessages: Dispatch<SetStateAction<any[]>>;
  joinRoom: (holidayId: string, user: UserAuthentificated) => void;
  sendMessage: (userName: UserAuthentificated, holidayId: string, message: string) => void; // Ajoutez cette signature
};

const defaultValue: MessagesContextType = {
  messages: [],
  setMessages: () => {},
  joinRoom: () => {},
  sendMessage: () => {}
};

export const MessagesContext = createContext<MessagesContextType>(defaultValue);

const MessagesProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setMessages]: [Message[], Dispatch<SetStateAction<never[]>>] = useState([]);

  //ETABLISSEMENT DE LA CONNECTION
  const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7048/chat") // URL DU SERVEUR
      .configureLogging(LogLevel.Information)
      .build();

  // METHODE POUR QUI PEREMT DE REJOINDRE UN CHAT
  const joinRoom = async (holidayId: string, user: UserAuthentificated) => {
    try {
      if (connection.state !== "Connected") {
        await connection.start();
      }

      //REGISTER DES LISTENERS
      connection.on("ReceiveWelcomeMessage", (messageReceive: Message) => {
        setMessages([]);
        setMessages((messages : Message[]) => [...messages, messageReceive]);
      });

      connection.on("ReceiveHistoryMessage", (messageHistory : Message[]) => {
        setMessages((messages: Message[]) => [...messages, ...messageHistory]);
      });

      connection.on("ReceiveSendMessage", (messageReceive : Message) => {
          setMessages((messages) => [...messages, messageReceive ]);
      });

      await connection.invoke("JoinRoom", holidayId, user);
    } catch (e) {
      console.log(e);
    }
  };

  // METHODE POUR ENVOYER UN MESSAGE DANS LE CHAT
  const sendMessage = async (user: UserAuthentificated, holidayId: string, message: string) => {
    try {
      if (connection.state !== "Connected") {
        await connection.start();
      }

      await connection.invoke("SendMessage", user, holidayId, message);
    } catch (e) {
      console.log(e);
    }
  };

  const contextValue = useMemo(() => ({
    messages,
    setMessages,
    joinRoom,
    sendMessage,
  }), [messages]);

  return <MessagesContext.Provider value={contextValue}>{children}</MessagesContext.Provider>;
}

export const useMessages = () => {
  return useContext(MessagesContext);
}

export default MessagesProvider;
