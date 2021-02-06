const sendTokenResponse = (user, statusCode, res) => {
	const token = user.getSignedJwtToken()

	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 1000 * 60 * 60 * 24
		),
		httpOnly: true,
	}

	if (process.env.NODE_ENV === 'production') {
		cookieOptions.secure = true
	}

	res.status(statusCode).cookie('token', token, cookieOptions).json({
		success: true,
		token,
		user,
	})
}

export default sendTokenResponse
