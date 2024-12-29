import { exec } from 'child_process'
import { createPayment } from '../services/paymentService.js'

/**
 * Handles the creation of a new payment request
 * Requires user authentication
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 */
export const createPaymentController = async (req, res) => {
  try {
    // Extract user information from the authenticated request
    const userId = req.user.userId // Assumes user is added to req by auth middleware
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' })
    }

    const { amount, operation } = req.body // Added operation to decide calculation

    // Validate input
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid payment amount' })
    }

    // Python script for calculations (transaction fee or conversion)
    exec(`python src/utils/math_calculations.py ${operation} ${amount}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing Python script:', error)
        return res.status(500).json({ message: 'Error calculating payment' })
      }

      const calculatedAmount = parseFloat(stdout.trim()) // Parse the result from Python

      // Check if parsed value is a valid number
      if (isNaN(calculatedAmount)) { 
        console.error('Invalid amount returned from Python script')
        return res.status(500).json({ message: 'Invalid calculation result' })
      }

      // Use the service to create a payment with the calculated amount and userId
      createPayment(calculatedAmount, userId) // Pass userId to link payment
        .then(payment => {
          res.status(201).json({
            message: 'Payment request created successfully',
            data: {
              paymentAddress: payment.address,
              amount: payment.amount,
              status: payment.status,
            },
          })
        })
        .catch(err => {
          console.error('Error in creating payment:', err)
          res.status(500).json({ message: 'Error creating payment request' })
        })
    })
  } catch (error) {
    console.error('Error in createPaymentController:', error)
    res.status(500).json({ message: 'Error creating payment request' })
  }
}

export default {
  createPaymentController,
}
