// Schema
import User from '../db/mongo/schema/user.js'
// Dependecies
import bcrypt from 'bcrypt'
const saltRounds = 10
import {generateToken} from '../utils/jwtUtils.js'
import dotenv from 'dotenv'
dotenv.config() 

// signup
const signup = async (req, res) => {
    // Test console.log
    // console.log(`Sign up Request body from controller: `, req.body)
    // Necessary information from request body
    const {name, lastName, age, email, password} = req.body
    
    // Check age
    if (age <18 || age > 25) {
        return res.status(400).json({message: 'Age must be between 18 and 25'})
    }
    // Check if fields are present
    if ( !name || !lastName || !email ) {
        return res.status(400).json({message: 'All info are required'})
    }
    
    
    // Check Password characters 
    if ( password.length <8 || password.length > 16 ) {
        return res.status(400).json({message: `Password must be between 8 to 16 characters`})
    } 
    

    try{
        // Check email already exist
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({message: 'Email already exists'})
        }

        
        // Hash password
        const hashedPassword = await bcrypt.hash( password, saltRounds )
        
        // Create new instance of User
        const newUser = new User({ name, lastName,age, email, password: hashedPassword})
        await newUser.save()
        
        // Exclude password from the response
        const { password: _, ...userWithoutPassword } = newUser.toObject()
        
        console.log('Signup completed')
        return res.status(201).json({message: 'Signup completed', user: userWithoutPassword})
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Error with signup: ', error})
    }
    
    
}


// login
const login = async (req, res) => {
    const {email, password} = req.body

    // Check email and password
    if (!email || !password) {
        return res.status(404).json({message: 'Both email and password required'})
    }
    
    // Find user by email
    const user = await User.findOne({email})
    
    try{

        // If user not found
        if (!user) {
            return res.status(400).json({message: 'User not found'})
        }

        // Compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password)

        // If password invalid
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid paasword'})
        }

        // Generate token
        const token = generateToken(user._id)

        // Login successful
        console.log('Login successful')
        return res.status(200).json({message: 'Login is successful', token})
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Error with login'})
    }
}



export default {
    signup,
    login
}