import Review from '../models/Review.js'
import asyncHandler from '../middleweare/asyncHandler.js'
import ErrorResponse from '../utils/errorResponse.js'
import Recipe from '../models/Recipe.js'

// Get all reviews
// GET /api/v1/recipes/:recipeId/reviews | Public
// GET /api/v1/auth/:userId/reviews  | Private
export const getReviews = asyncHandler(async (req, res, next) => {
	if (req.params.recipeId) {
		const reviews = await Review.find({
			recipe: req.params.recipeId,
		})
			.sort({ createdAt: '-1' })
			.populate('recipe', 'name images')
			.populate('user', 'firstName lastName photo')
		res.status(200).json({
			success: true,
			count: reviews.length,
			data: reviews,
		})
	} else if (req.params.userId) {
		const reviews = await Review.find({ user: req.params.userId }).populate(
			'recipe',
			'name images'
		)
		res.status(200).json({
			success: true,
			count: reviews.length,
			data: reviews,
		})
	} else {
		const reviews = await Review.find({}).populate('recipe', 'name images')

		res.json({
			success: true,
			count: reviews.length,
			data: reviews,
		})
	}
})

// Get a single review
// GET /api/v1/reviews/:id | Public
export const getReview = asyncHandler(async (req, res, next) => {
	const review = await Review.findById(req.params.id).populate(
		'recipe',
		'name description'
	)

	if (review) {
		res.status(200).json({
			success: true,
			data: review,
		})
	} else {
		next(new ErrorResponse('No review found', 404))
	}
})

// Add review
// POST /api/v1/recipes/:recipeId/reviews | Require Auth
export const addReview = asyncHandler(async (req, res, next) => {
	req.body.recipe = req.params.recipeId
	req.body.user = req.user._id

	const recipe = await Recipe.findById(req.params.recipeId)

	if (recipe) {
		const review = await Review.create(req.body)
		res.status(201).json({
			success: true,
			data: review,
		})
	} else {
		return next(new ErrorResponse('No recipe found', 404))
	}
})

// Update review
// PUT/api/v1/reviews/:id | Require Auth
export const updateReview = asyncHandler(async (req, res, next) => {
	let review = await Review.findById(req.params.id)

	if (review) {
		if (review.user.toString() === req.user._id.toString()) {
			review = await Review.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			})
			res.status(200).json({
				success: true,
				data: review,
			})
		} else {
			next(
				new ErrorResponse('You are not authorized to update this review', 401)
			)
		}
	} else {
		next(new ErrorResponse('No review found', 404))
	}
})

// Delete a review
// DELETE /api/v1/reviews/:id | Require Auth
export const deleteReview = asyncHandler(async (req, res, next) => {
	const review = await Review.findById(req.params.id)

	if (review) {
		await review.remove()
		res.status(200).json({
			success: true,
			data: {},
		})
	} else {
		next(new ErrorResponse('No review found', 404))
	}
})
