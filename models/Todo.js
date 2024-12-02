import mongoose, { model } from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },
});

const Todo = model("Todo", todoSchema);
export default Todo;
