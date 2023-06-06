import { dotEnvPath } from './path/index';
import { config as dotenv } from 'dotenv'

dotenv({path: dotEnvPath()})

export default {
    databaseConnectionString: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_NAME}.1ttqcsm.mongodb.net/?retryWrites=true&w=majority`,
    tokenJWTSecrect: `${process.env.JWT_SECRECT}`,
    authTokenExpire: process.env.JWT_TOKEN_EXPIRE_TIME,
}