import { useContext, createContext, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { HOST } from "../utils/constants";
import { useStore } from "../store";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const socket = useRef(null);
    const { userInfo } = useStore();

    useEffect(() => {
        if (userInfo) {
            // Create the socket connection
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo._id },
            });

            // Handle connection
            socket.current.on("connect", () => {
                console.log("Connected to socket server");
            });

            // Handle receiving messages (community or personal)
            const handleReceiveMessages = (message) => {
                const { selectedChatType, selectedChatData, addMessage } = useStore.getState();
                console.log(message)
                // Handle community messages
                if (message.isCommunity) {
                    if (selectedChatType === "community") {
                        addMessage(message);
                    }
                } else {
                    // Handle personal messages
                    if (
                        selectedChatType !== undefined &&
                        (selectedChatData?._id === message.sender?._id || selectedChatData?._id === message.recipient?._id)
                    ) {
                        addMessage(message);
                    }
                }
            };

            // Listen for messages from the server
            socket.current.on("recieve-message", handleReceiveMessages);

            return () => { 
                socket.current.disconnect(); // Close the socket connection
            };
        }
    }, [userInfo]);

    return <SocketContext.Provider value={socket.current}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    return useContext(SocketContext);
};
