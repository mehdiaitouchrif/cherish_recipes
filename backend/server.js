import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import expressMongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'
import cors from 'cors'
import connectDB from './database/db.js'
import cookieParser from 'cookie-parser'
import errorHandler from './middleweare/errorHandler.js'

// Env config
dotenv.config()

// Connect to MongoDB Atlas
connectDB()

// Route files
import authRoutes from './routes/authRoutes.js'
import recipeRoutes from './routes/recipeRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

// Express setup
const app = express()
app.use(express.json())

const __dirname = path.resolve()

// Cookie parser
app.use(cookieParser())

// Sanitize data
app.use(expressMongoSanitize())

// Set security header
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Allow cross-origin requests
app.use(cors())

// Rate limit
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 300,
})

app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Mount routers
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/recipes', recipeRoutes)
app.use('/api/v1/reviews', reviewRoutes)
app.use('/api/v1/upload', uploadRoutes)

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}
// Custom error middleweare
app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	)
}

// Listen
const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
	console.log(`Error: ${error.message}`)
	// Close server & exit process
	server.close(() => process.exit(1))
})
