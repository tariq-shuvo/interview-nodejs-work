export class UsersType {
    constructor(
        public username: string, 
        public first_name: string, 
        public last_name: string, 
        public email: string, 
        public address: string, 
        public password: string
    ){}
}