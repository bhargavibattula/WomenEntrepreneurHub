import Message from "../models/message_model.js"

export const getAllCommunityMessages = async (req , res) => {
    try {
        const messages = await Message.find({isCommunity : true}).populate("sender").populate("recipient");
        return res.status(200).json({success : true , messages})
    } catch (error) {
        console.log("Error fetching messages:", error.message);
        res.status(500).json({
            message: "Error fetching messages",
            error: error.message
        });
    }
}