
import mongoose from "mongoose";

const UserShema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
  },
  surname: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  todos: [
    {
        type: mongoose.Schema.ObjectId,
        ref: "Todo"
    }
],

});

export const Userr = mongoose.model("Userr", UserShema);
