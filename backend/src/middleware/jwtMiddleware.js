import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const authUtil = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1] // Extract token from "Bearer <token>"

    if (!token) {
        console.log('No token provided')
        return res.status(401).json({ message: 'Unauthorized: User not authenticated' })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET) // Verify token
        req.user = decoded // Attach user to request
        next() // Proceed to the next middleware
    } catch (error) {
        console.error('Invalid or expired token:', error.message)
        return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' })
    }
}

export default authUtil
