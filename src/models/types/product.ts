import { Document } from "mongoose"

interface Todo {
    title: string,
    message: string
}

interface TodoDoc extends Document, Todo {}

export default TodoDoc