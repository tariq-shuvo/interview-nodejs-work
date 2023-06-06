import Mongoose, { Schema } from "mongoose"
import TodoDoc from "../types/product"

const todoSchema: Schema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    }
})

const TodoModel = Mongoose.model<TodoDoc>('todo', todoSchema)

export default TodoModel