import { ICard } from "../interfaces/ICard";
import mongoose from "mongoose";

export const cardSchema = new mongoose.Schema({
  boardId: {
    type: String,
    required: [true],
  },
  title: {
    type: String,
    required: [true],
  },
  content: {
    type: String
  },
  column: {
    type: String,
    required: [true]
  },
});

cardSchema.virtual('id').get(() => this._id);

export default mongoose.model<ICard & mongoose.Document>("cards", cardSchema);
