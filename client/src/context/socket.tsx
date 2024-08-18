import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SERVER_URL = process.env.BACKEND_URL || "http://localhost:3001";

export const socket = io(SERVER_URL);

export const SocketContext = createContext(socket);

const SocketProvider = ({ children }: any) => {
  return (
    <SocketContext.Provider value={socket}> {children} </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};

export default SocketProvider;
