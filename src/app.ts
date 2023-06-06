import express, { Request, Response, NextFunction } from 'express'

import { json } from 'body-parser'

import { connect } from './database/connect'

import todoRoutes from './routes/todos'

const port = 3000;
const app = express()

connect()

app.use(json())

app.use('/todos', todoRoutes)

app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    return res.status(500).json({
        message: err.message
    })
})

app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`);
})