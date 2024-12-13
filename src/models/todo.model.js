import mongoose from "mongoose";

const TodoShema = new mongoose.Schema({
    task: {
        type: String,
        require: true,
        trim: true,
      },
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: "Userr",
        require: true,
    },
      completed: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: null,
      },
})

export const Todo = mongoose.model("Todo", TodoShema);
