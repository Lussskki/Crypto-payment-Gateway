import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

// Connection string to mongo
const connectionString = process.env.MONGO_URL

try{
    mongoose.connect(connectionString)
    console.log('Connected to mongo database')
}catch(error){
    console.log(`Error with connection string: ${error}`)
}