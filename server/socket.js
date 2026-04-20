import { Server } from "socket.io"
import Message  from "./models/message_model.js";

export const SetUpSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: [
                "http://localhost:5173",
                "https://women-entrepreneur-hub-q9ox.vercel.app"
            ],
            credentials: true
        }
    });

    const userSocketMap = new Map();
    const COMMUNITY_ROOM = "community";

    const disconnect = (socket) => {
        console.log(`Client disconnected : ${socket.id}`);
        for(let [userId , socketId] of userSocketMap.entries()) {
            if(socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    }

    const sendMessage = async (message) => {
        if(message.isCommunity) {
            console.log(message);
            const createdMessage = await Message.create(message);

            const messageData = await Message.findById(createdMessage._id).populate("sender");

            io.to(COMMUNITY_ROOM).emit("recieve-message" , messageData);
        }else {
            const senderSocketId = userSocketMap.get(message.sender);
            const recipientSocketId = userSocketMap.get(message.recipient);
            const createdMessage = await Message.create(message);

            const messageData = await Message.findById(createdMessage._id).populate("sender").populate("recipient");

            if(recipientSocketId) {
                io.to(recipientSocketId).emit("receive-message" , messageData)
            }
            if(senderSocketId) {
                io.to(senderSocketId).emit("receive-message" , messageData)
            }

         }
    }

    io.on("connection" , socket => {
        const userId = socket.handshake.query.userId ;

        if(userId) {
            userSocketMap.set(userId , socket.id);
            socket.join(COMMUNITY_ROOM);
            console.log(`User Connected ${userId} to socket id ${socket.id}`)

            io.to(socket.id).emit("joinned-community",COMMUNITY_ROOM);
        }else {
            console.log("User id not provided")
        }

        socket.on("send-message" , sendMessage );
        socket.on("disconnect",() => disconnect(socket))
    });

};