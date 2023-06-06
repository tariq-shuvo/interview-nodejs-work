import { Document } from "mongoose"

interface User {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    address: string,
    password: string
}

interface UserDoc extends Document, User {}

export default UserDoc