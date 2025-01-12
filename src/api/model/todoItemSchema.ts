import mongoose from 'mongoose';
import { InitialTodo } from '../../interfaces/index.ts';

const todoItemSchema = new mongoose.Schema<InitialTodo>({
    itemId: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
	    required: true
    }
});

export const TodoItem = mongoose.model<InitialTodo>('TodoItem', todoItemSchema);