// Be safe 
import dotenv from 'dotenv'
dotenv.config()

// Parser
import bodyParser from 'body-parser'

// Connect with database
import './db/mongo/connectMongo.js'

// Express server initialize
import express from 'express'
const app = express()
 
// Json files
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
import paymentRoutes from './routes/payment.js'
import auth from './routes/auth.js'
app.use('/api/payment', paymentRoutes)
app.use('/api/auth', auth)
   

// Server listens to port
app.listen(3000, ()=> {
    console.log('Server is runing on http://localhost:3000/')
})