import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import UserModel from '../models/schema/User';
import UserDoc from '../models/types/user';
import { UsersType } from './types/usersType';
import globalConfig from '../config/global.config';

type UniqueUserCheckInfo = {
    username: string;
    email: string;
}

export const registerUser:RequestHandler = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }

    const username = (req.body as {username:string}).username.toLowerCase();
    const first_name = (req.body as {first_name:string}).first_name.toLowerCase();
    const last_name = (req.body as {last_name:string}).last_name.toLowerCase();
    const email = (req.body as {email:string}).email.toLowerCase();
    const address = (req.body as {address:string}).address.toLowerCase();
    const password = (req.body as {password:string}).password;

    let userValidationInfo:UniqueUserCheckInfo | null;
    
    try{
        userValidationInfo = await UserModel.findOne({
            $or:[ {username}, {email} ]
        }).select("username email");
    } catch (error:any) {
        throw new Error(error)
    }

    if(userValidationInfo){
        if (userValidationInfo.email == email) {
            return res.status(400).send({
                success: false,
                errors: [
                    {
                        msg: 'email is already registered',
                        param: 'email'
                    }
                ]
            });
        }else{
            return res.status(400).send({
                success: false,
                errors: [
                    {
                        msg: 'username is already registered',
                        param: 'username'
                    }
                ]
            });
        }
    }

    let user = new UsersType(username, first_name, last_name, email, address, password);
    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    let newUser: UserDoc;

    try {
        newUser = await UserModel.create(user);
    } catch (error:any) {
        throw new Error(error);
    }

    return res.status(201).json({
        success: true,
        message: 'user is registered successfully.',
        data: {username, first_name, last_name, email, address}
    })
}

export const loginUser:RequestHandler = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({
            errors: error.array()
        })
    }

    const username = (req.body as {username:string}).username;
    const password = (req.body as {password:string}).password;

    let existingUser: UserDoc | null;

    try {
        existingUser = await UserModel.findOne({
            username
        });

        if (!existingUser) {
            return res
                .status(400)
                .send({
                    success: false,
                    errors: [{
                        msg: 'Invalid credentials'
                    }]
                });
        }

        const isMatch:boolean = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res
                .status(400)
                .send({
                    success: false,
                    errors: [{
                        msg: 'Invalid credentials'
                    }]
                });
        }

        let userInfo = {
            username: existingUser.username,
            first_name: existingUser.first_name,
            last_name: existingUser.last_name,
            address: existingUser.address,
            email: existingUser.email
        };

        const token = jsonwebtoken.sign(userInfo, globalConfig.tokenJWTSecrect, { expiresIn: globalConfig.authTokenExpire});
        existingUser.token = token;
        await existingUser.save();
            
        const response = {
            success: true,
            token
        };
        return res.status(201).json(response);
    } catch (error:any) {
        throw new Error(error)
    }
}

export const fetchUserInfo:RequestHandler = async (req:any, res, next) => {
    return res.status(200).json({
        success: true,
        data: req.user
    })
}

export const refreshTokenGenerate:RequestHandler = async (req:any, res, next) => {
    const user = req.user;
    let userInfo = {
        firstname: user.first_name,
        lastname: user.last_name,
        avatar: user.avatar,
        email: user.email
    };
    const token = jsonwebtoken.sign(userInfo, globalConfig.tokenJWTSecrect, { expiresIn: globalConfig.authTokenExpire});

    const response = {
        "token": token,
    };

    const updateUserToken:any = await UserModel.findById(user._id);
    updateUserToken.token = token;
    await updateUserToken.save();

    res.status(200).json({
        success: true,
        ...response
    }); 
}

export const logoutUser:RequestHandler = async (req:any, res, next) => {
    const user = req.user;

    const updateUserToken:any = await UserModel.findById(user._id);
    updateUserToken.token = null;
    await updateUserToken.save();

    res.status(200).json({
        success: true,
        data: user
    }); 
}