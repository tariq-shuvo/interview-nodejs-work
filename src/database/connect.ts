import Mongoose from 'mongoose'
import globalConfig from '../config/global.config'

let database: Mongoose.Connection

export const connect = async () => {
    const uri = globalConfig.databaseConnectionString

    try {
        await Mongoose.connect(uri, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        database = Mongoose.connection
        console.log("Connected to database");
    } catch (error:any) {
        console.error(error.message)
        // Exit process with failure
        process.exit(1)
    }
}

export const disconnect = () => {
    if (!database) {
      return
    }
    Mongoose.disconnect()
}