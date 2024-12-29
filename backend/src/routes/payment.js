import express from 'express'
import paymentController from '../controllers/paymentController.js'
import authUtil  from '../middleware/jwtMiddleware.js'

const router = express.Router()

// Use the correct function from the default export
router.post('/create', authUtil,  paymentController.createPaymentController)

export default router 
