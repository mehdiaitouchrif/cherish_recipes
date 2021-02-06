import Recipe from '../models/Recipe.js'
import asyncHandler from '../middleweare/asyncHandler.js'
import ErrorResponse from '../utils/errorResponse.js'

// List all recipes
// GET /api/v1/recipes | Public
// GET /api/v1/auth/:userId/recipes
export const getRecipes = asyncHandler(async (req, res) => {
	/////////// Filters & Pagination /////////
	// 1. Filtering
	let query
	const reqQuery = { ...req.query }

	// Fields to exclude
	const excludedFields = ['select', 'sort', 'page', 'limit', 'search']
	excludedFields.forEach((field) => delete reqQuery[field])

	let queryStr = JSON.stringify(reqQuery)
	queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

	// 2. Searching
	let search = {}
	if (req.query.search) {
		search = {
			name: {
				$regex: req.query.search,
				$options: 'i',
			},
		}
	}

	// Execute
	query = Recipe.find({ ...JSON.parse(queryStr), ...search })

	// 3. Selecting
	if (req.query.select) {
		const fields = req.query.select.split(',').join(' ')
		query = query.select(fields)
	}

	// 4. Sorting
	if (req.query.sort) {
		const sortBy = req.query.sort.split(',').join(' ')
		query = query.sort(sortBy)
	} else {
		query = query.sort('-createdAt')
	}

	// 5. Pagination
	const pageNumber = Number(req.query.page) || 1
	const pageSize = Number(req.query.limit) || 20
	const skip = (pageNumber - 1) * pageSize
	const count = await Recipe.countDocuments({ ...search })

	query = query.skip(skip).limit(pageSize)

	// Pagination result
	const paginationObj = {
		page: pageNumber,
		pages: Math.ceil(count / pageSize),
	}

	if (pageNumber * pageSize < count) {
		paginationObj.nextPage = pageNumber + 1
	}

	if (skip > 0) {
		paginationObj.previousPage = pageNumber - 1
	}

	////// Filter & Pagination End /////////

	if (req.params.userId) {
		const recipes = await Recipe.find({
			user: req.params.userId,
			...JSON.parse(queryStr),
		})
		res.status(200).json({
			success: true,
			count: recipes.length,
			pagination: paginationObj,
			data: recipes,
		})
	} else {
		const recipes = await query.populate('user', 'firstName lastName photo')

		res.json({
			success: true,
			count: recipes.length,
			pagination: paginationObj,
			data: recipes,
		})
	}
})

// List single recipe
// GET /api/v1/recipes/:id | Public
export const getRecipe = asyncHandler(async (req, res, next) => {
	const recipe = await Recipe.findById(req.params.id).populate(
		'user',
		'firstName lastName photo'
	)

	if (recipe) {
		res.json({
			success: true,
			data: recipe,
		})
	} else {
		next(new ErrorResponse('No recipe found', 404))
	}
})

// Create a recipe
// POST /api/v1/recipes | Require Auth
export const createRecipe = asyncHandler(async (req, res) => {
	req.body.user = req.user._id
	console.log(req.file)
	const recipe = await Recipe.create(req.body)

	res.status(201).json({
		success: true,
		data: recipe,
	})
})

// Update a recipe
// PUT /api/v1/recipes/:id | Require Auth
export const updateRecipe = asyncHandler(async (req, res, next) => {
	let recipe = await Recipe.findById(req.params.id)

	if (recipe) {
		if (recipe.user.toString() === req.user._id.toString()) {
			recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			})
			res.status(200).json({
				success: true,
				data: recipe,
			})
		} else {
			next(
				new ErrorResponse("You're not authorized to update this recipe", 401)
			)
		}
	} else {
		next(new ErrorResponse('No recipe found', 404))
	}
})

// Delete a recipe
// DELETE /api/v1/:id | Require Auth
export const deleteRecipe = asyncHandler(async (req, res, next) => {
	const recipe = await Recipe.findById(req.params.id)

	if (recipe) {
		if (req.user._id.toString() === recipe.user.toString()) {
			// then user owns it
			await recipe.remove()
			res.status(200).json({
				success: true,
				data: {},
			})
		} else {
			next(
				new ErrorResponse("You're not authorized to delete this recipe", 401)
			)
		}
	} else {
		next(new ErrorResponse('No recipe found', 404))
	}
})
