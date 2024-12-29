
import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  status: { 
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' }
})

const Payment = mongoose.model('Payment', paymentSchema)

export default Payment
