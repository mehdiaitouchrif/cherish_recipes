import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please add your first name'],
		},
		lastName: {
			type: String,
			required: [true, 'Please add your last name'],
		},
		email: {
			type: String,
			required: [true, 'Please add your email'],
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please add a valid email',
			],
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: 6,
		},
		averageRating: {
			type: Number,
			min: [1, 'Rating must be at least 1'],
			max: [5, 'Rating cannot be more than 5'],
		},
		photo: {
			type: String,
			required: true,
			default: '/images/user.webp',
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,
		confirmEmailToken: String,
		isEmailConfirmed: {
			type: Boolean,
			default: false,
		},
		toFactorCode: String,
		twoFactorCodeExpire: Date,
		twoFactorEnable: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
)

// Hash password before saving it in databse
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT
userSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	})
}

// Match Passwords
userSchema.methods.matchPasswords = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString('hex')

	// Hash token
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex')

	// Set exipre
	this.resetPasswordExpire = Date.now() + 1000 * 60 * 15

	return resetToken
}

userSchema.methods.getConfirmEmailToken = function () {
	// Generate token
	const confirmationToken = crypto.randomBytes(20).toString('hex')

	// Hash it
	this.confirmEmailToken = crypto
		.createHash('sha256')
		.update(confirmationToken)
		.digest('hex')

	return confirmationToken
}

// Cascade delete recipes when a user is deleted
userSchema.pre('remove', async function () {
	await this.model('Recipe').deleteMany({ user: this._id })
})

// Create model
const User = mongoose.model('User', userSchema)

export default User
