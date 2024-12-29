import Payment from '../db/mongo/schema/payment.js'

/**
 * Creates a new payment in the database
 * @param {Number} amount - The amount of cryptocurrency for the payment
 * @param {String} userId - The user ID of the user making the payment
 * @returns {Object} - The created payment object
 */
export const createPayment = async (amount, userId) => {
  try {
    // Generate a unique payment address
    const paymentAddress = `address_${Math.random().toString(36).substring(2)}`

    const payment = new Payment({
      amount,
      address: paymentAddress,
      status: 'pending',
      userId
    })

    
    return await payment.save()
  } catch (error) {
    console.error('Error in createPayment service:', error)
    throw new Error('Failed to create payment')
  }
}
