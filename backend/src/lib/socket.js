import { Server } from "socket.io";
import http from "http";
import express from "express";
import { allowedOrigins } from "../config/cors.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    },
});

const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query?.userId;

    // Validate userId
    if (
        !userId ||
        typeof userId !== "string" ||
        userId.trim().length === 0
    ) {
        console.log(`Rejected connection: Invalid userId (${socket.id})`);
        socket.disconnect(true);
        return;
    }

    userSocketMap[userId] = socket.id;

    console.log(`User connected: ${userId} (${socket.id})`);

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${userId} (${socket.id})`);

        if (userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId];
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };