import mongoose from "mongoose";

const MAX_MESSAGE_LENGTH = 2000;

const messageSchema =new mongoose.Schema(
  {
    senderId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text: {
      type: String,
      trim: true,
      maxlength: MAX_MESSAGE_LENGTH,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Require at least text or image
messageSchema.pre("validate", function (next) {
  const hasText = this.text?.trim();
  const hasImage = this.image?.trim();

  if (!hasText && !hasImage) {
    return next(
      new Error("Message must contain text or image")
    );
  }

  next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;