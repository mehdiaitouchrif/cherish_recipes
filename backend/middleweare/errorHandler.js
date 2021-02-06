const errorHandler = (err, req, res, next) => {
	// Log to console for dev
	console.log(err.stack)

	res.status(err.statusCode || 500).json({
		success: false,
		message: err.message || 'Server Error',
	})
}

export default errorHandler
