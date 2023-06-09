import express, { Request, Response, NextFunction } from 'express';

import { json } from 'body-parser';

import cors from 'cors';

import { connect } from './database/connect';

import productRoutes from './routes/products';
import userRoutes from './routes/users';

const port = 5000;
const app = express();

connect();

app.use(cors());

app.use(json());

app.use('/product', productRoutes);
app.use('/user', userRoutes);

app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    return res.status(500).json({
        message: err.message
    })
});

app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`);
});

export default app;