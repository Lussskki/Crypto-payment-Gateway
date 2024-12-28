import mongoose from 'mongoose'

// Schema for mongodb
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                // regex check @
                return /^.+@.+\..+$/.test(v)
            },
            message: props => `${props.value} is not valid email! Must contain "@" `
        }
    },
    password: {
        type: String,
        required: true
    }
})

const User = new mongoose.model('User', schema)

export default User