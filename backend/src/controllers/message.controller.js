import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error In getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
        if (!mongoose.Types.ObjectId.isValid(userToChatId)) {
            return res.status(400).json({
                error: "Invalid user ID",
            });
        }

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        console.log(messages)

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({
            error: "Internal server error",
        });
    }
};

const MAX_MESSAGE_LENGTH = 2000;

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Validate receiver id
        if (!mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({
                error: "Invalid receiver ID",
            });
        }

        // Validate payload
        const trimmedText = text?.trim();

        if (!trimmedText && !image) {
            return res.status(400).json({
                error: "Message must contain text or image",
            });
        }

        // Validate text length
        if (
            trimmedText &&
            trimmedText.length > MAX_MESSAGE_LENGTH
        ) {
            return res.status(400).json({
                error: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`,
            });
        }

        // Check receiver exists
        const receiver = await User.findById(receiverId);

        if (!receiver) {
            return res.status(404).json({
                error: "Receiver not found",
            });
        }

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text: trimmedText || "",
            image: imageUrl,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
};