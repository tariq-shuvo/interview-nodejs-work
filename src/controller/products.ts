import { RequestHandler } from 'express'
import { validationResult } from 'express-validator'
import TodoModel from '../models/schema/Todo'
import TodoDoc from '../models/types/product'
import { TodosType } from './types/productsType'

export const createTodo:RequestHandler = async (req, res, next) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }

    const title = (req.body as {title:string}).title
    const message = (req.body as {message:string}).message
    let newTodo: TodoDoc

    try {
        newTodo = await TodoModel.create(new TodosType(title, message))
    } catch (error:any) {
        throw new Error(error)
    }

    return res.status(201).json({
        message: 'Todo is created.',
        data: newTodo
    })
}

export const getTodos:RequestHandler = async (req, res, next) => {
    let todos:object[]

    try {
        todos = await TodoModel.find({})
    } catch (error:any) {
        throw new Error(error)
    }
    return res.status(200).json({
        data: todos
    })
}

export const updateTodo:RequestHandler<{id: string}> = async (req, res, next) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }

    const id = req.params.id
    const title = (req.body as {title:string}).title
    const message = (req.body as {message:string}).message

    let todoInfo: TodoDoc | null

    try {
        todoInfo = await TodoModel.findById(id)

        if(!todoInfo){
            return res.status(400).json({
                errors: {
                    value: id,
                    msg: "Could not find todo",
                    param: "id",
                    location: "params"
                }
            })
        }

        todoInfo.title = title
        todoInfo.message = message

        await todoInfo.save()
    } catch (error:any) {
        throw new Error(error)
    }

    return res.status(201).json({
        message: 'Todo is updated successfully.',
        data: todoInfo
    })
}

export const deleteTodo:RequestHandler<{id: string}> = async (req, res, next) => {
    const id = req.params.id

    let todoInfo: TodoDoc | null

    try {
        todoInfo = await TodoModel.findById(id)

        if(!todoInfo){
            return res.status(400).json({
                errors: {
                    value: id,
                    msg: "Could not find todo",
                    param: "id",
                    location: "params"
                }
            })
        }

        await todoInfo.delete()
    } catch (error:any) {
        throw new Error(error)
    }

    return res.status(201).json({
        message: 'Todo is deleted successfully.',
        data: todoInfo
    })
}