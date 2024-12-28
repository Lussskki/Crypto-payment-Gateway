import express from 'express'
const router = express.Router()

// Controller of signup and login methods
import Auth from '../controllers/authControllers.js'


// Auth/signup
router.post('/signup', Auth.signup)
// Auth/login
router.post('/login', Auth.login)
 

export default router