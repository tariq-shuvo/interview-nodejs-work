import { Document } from "mongoose";

interface User {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    address: string,
    password: string,
    token?: string,
};

interface UserDoc extends Document, User {};

export default UserDoc;