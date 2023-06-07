import Mongoose, { Schema } from "mongoose";
import UserDoc from "../types/user";

const userSchema: Schema = new Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    first_name:{
        type: String,
        required: true,
        trim: true
    },
    last_name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: {
        type: String,
        default: null
    },
    create:{
        type: Date,
        default: Date.now()
    }
})

const UserModel = Mongoose.model<UserDoc>('user', userSchema);

export default UserModel;