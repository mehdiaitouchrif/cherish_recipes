import crypto from 'crypto'
import User from '../models/User.js'
import ErrorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleweare/asyncHandler.js'
import sendTokenResponse from '../utils/sendTokenResponse.js'
import sendEmail from '../utils/sendEmail.js'

// Sign up
// POST /api/v1/auth/signup | Public
export const signUp = asyncHandler(async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body

	// Check if user already exists
	const existingUser = await User.findOne({ email })

	if (existingUser) {
		next(new ErrorResponse('User already exists', 400))
	} else {
		// Create user
		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
		})
		//////////// CONFIRM EMAIL ////////////////
		// Send Email confirmation token
		// Get reset token
		const confirmationToken = user.getConfirmEmailToken()
		await user.save({ validateBeforeSave: false })

		// Create reset url
		// const confirmUrl = `${req.protocol}://${req.get(
		// 	'host'
		// )}/api/v1/auth/confirmemail/${confirmationToken}`

		const confirmUrl = `${req.protocol}://${req.get(
			'host'
		)}/confirmemail/${confirmationToken}`
		const message = `We are sending you this email to verify your account. Please click the button below to do so `

		try {
			await sendEmail({
				email: user.email,
				subject: 'Account Verification',
				message,
				htmlTitle: `<a href="${confirmUrl}">Confirm Email</a> `,
			})
			await sendEmail({
				email: user.email,
				subject: 'Welcome to Cherish Recipes',
				message: `Welcome ${firstName}, we are happy to have at our platform`,
				htmlTitle: `<button>Go to <a href='https://cherishrecipes.com'>Cherish Recipes</a> </button>`,
			})
		} catch (error) {
			console.log(error)
			user.isEmailConfirmed = false
			user.confirmEmailToken = undefined
			await user.save({ validateBeforeSave: false })
			return next(new ErrorResponse('Email sending failed', 500))
		}

		///////// CONFIRM EMAIL END /////////

		// Send token response & store it in cookie
		sendTokenResponse(user, 200, res)
	}
})

// Sign in
// POST /api/v1/auth/signin | Public
export const signIn = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body

	if (!email) {
		next(new ErrorResponse('Please enter your email', 400))
	}
	if (!password) {
		next(new ErrorResponse('Please enter your password'))
	}

	const user = await User.findOne({ email })

	if (user) {
		// Check for password
		const isMatch = await user.matchPasswords(password)
		if (isMatch) {
			// Send token & store it in cookie
			sendTokenResponse(user, 200, res)
		} else {
			next(new ErrorResponse('Invalid password or password', 400))
		}
	} else {
		next(new ErrorResponse('Invalid email or password', 400))
	}
})

// Logout
// GET /api/v1/auth/logout | Require Auth
export const logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	})

	res.status(200).json({
		success: true,
		data: {},
	})
})

// Get current user
// GET /api/v1/auth/me | Require Auth
export const getCurrentUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user._id)
	res.json({
		success: true,
		data: user,
	})
})

// Update details
// PUT /api/v1/auth/updatedetails | Require Auth
export const updateDetails = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user._id)

	user.firstName = req.body.firstName || user.firstName
	user.lastName = req.body.lastName || user.lastName
	user.email = req.body.email || user.email
	user.photo = req.body.photo || user.photo

	const updatedUser = await user.save()
	res.json({
		success: true,
		data: updatedUser,
	})
})

// Update password
// PUT /api/v1/auth/updatepassword | Require Auth
export const updatePassword = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user._id).select('+password')

	if (!req.body.currentPassword) {
		next(new ErrorResponse('Please enter your current password', 400))
	}
	if (!req.body.newPassword) {
		next(new ErrorResponse('Please enter the new password', 400))
	}

	// Match password in db with entered pass
	const isMatch = await user.matchPasswords(req.body.currentPassword)
	if (isMatch) {
		user.password = req.body.newPassword
		await user.save()
		sendTokenResponse(user, 200, res)
	} else {
		next(new ErrorResponse('Incorrect password', 400))
	}
})

// Forgot password
// POST /api/v1/auth/forgotpassword | Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email })

	if (user) {
		// Get reset token
		const resetToken = user.getResetPasswordToken()
		await user.save({ validateBeforeSave: false })

		// // Create reset url
		// const resetUrl = `${req.protocol}://${req.get(
		// 	'host'
		// )}/api/v1/auth/resetpassword/${resetToken}`

		const message = `You are recieving this email because you or someone else request a password reset. <h2>CODE: ${resetToken} </h2> `

		try {
			await sendEmail({
				email: user.email,
				subject: 'Password Reset',
				message,
			})
			res.status(200).json({
				success: true,
				data: 'Email sent successfully',
			})
		} catch (error) {
			console.log(error)
			user.resetPasswordToken = undefined
			user.resetPasswordExpire = undefined
			await user.save({ validateBeforeSave: false })
			return next(new ErrorResponse('Email sending failed', 500))
		}
		res.status(200).json({
			success: true,
			data: user,
		})
	} else {
		next(new ErrorResponse("Sorry, This email doesn't exist", 400))
	}
})

// Reset passowrd
// PUT /api/v1/auth/resetpassword/:resettoken | Public
export const resetPassword = asyncHandler(async (req, res, next) => {
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.resettoken)
		.digest('hex')

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	})

	if (user) {
		// Set new password
		user.password = req.body.password
		user.resetPasswordExpire = undefined
		user.resetPasswordToken = undefined

		await user.save()

		sendTokenResponse(user, 200, res)
	} else {
		next(new ErrorResponse('Invalid reset token', 400))
	}
})

// Confirm email
// POST /api/v1/auth/sendConfirmationEmail
export const sendConfirmationEmail = asyncHandler(async (req, res, next) => {
	const user = await User.findOne({ _id: req.user.id })
	// Get reset token
	const confirmationToken = user.getConfirmEmailToken()
	await user.save({ validateBeforeSave: false })

	// Create reset url
	const confirmUrl = `${req.protocol}://${req.get(
		'host'
	)}/confirmemail/${confirmationToken}`

	const message = `We are sending you this email to verify your account. Please click the button below to do so `

	try {
		await sendEmail({
			email: user.email,
			subject: 'Account Verification',
			message,
			htmlTitle: `<a href="${confirmUrl}">Confirm Email</a> `,
		})
		res.status(200).json({
			success: true,
			message: 'Confirmation email sent',
		})
	} catch (error) {
		console.log(error)
		user.isEmailConfirmed = false
		user.confirmEmailToken = undefined
		await user.save({ validateBeforeSave: false })
		return next(new ErrorResponse('Email sending failed', 500))
	}
})

// PUT /api/v1/auth/confirmemail/:confirmationtoken | Public
export const confirmEmail = asyncHandler(async (req, res, next) => {
	// Get the unhashed token
	const token = req.params.confirmationtoken
	// Get hashed token
	const confirmEmailToken = crypto
		.createHash('sha256')
		.update(token)
		.digest('hex')

	const user = await User.findOne({
		confirmEmailToken,
	})

	if (user) {
		user.confirmEmailToken = undefined
		user.isEmailConfirmed = true

		await user.save()

		sendTokenResponse(user, 200, res)
	} else {
		next(new ErrorResponse('Invalid email confirmation token', 400))
	}
})

// Delete account
// DELETE /api/v1/auth/deleteAccount | Require Auth
export const deleteAccount = asyncHandler(async (req, res, next) => {
	await User.findByIdAndDelete(req.user._id)

	res.json({
		success: true,
		data: {},
	})
})
