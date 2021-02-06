import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import asyncHandler from './asyncHandler.js'
import ErrorResponse from '../utils/errorResponse.js'

const requireAuth = asyncHandler(async (req, res, next) => {
	let token

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1]

			// Verify token
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

			req.user = await User.findById(decodedToken.id).select('-password')
			next()
		} catch (error) {
			console.error(error)
			next(new ErrorResponse('Invalid Token - Authorization declined', 401))
		}
	} else if (req.cookies.token) {
		token = req.cookies.token
	}

	if (!token) {
		next(new ErrorResponse('No token provided - Authorization declined', 401))
	}
})

export default requireAuth
