import mongoose from 'mongoose'

const recipeSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: [true, 'Please give the recipe a name'],
		},
		description: {
			type: String,
			required: [true, 'Please give the recipe a description'],
			maxlength: [500, 'Description can not be more than 500 characters'],
		},
		images: {
			type: [String],
			required: [true, 'Please add at least 1 image'],
			default: ['/images/no-image.jpg'],
		},
		cuisine: {
			type: String,
			required: [true, 'Please select an appropriate cuisine for your recipe'],
			enum: [
				'French',
				'Italian',
				'Chinese',
				'American',
				'Thai',
				'Japanese',
				'Indian',
				'Turkish',
				'Spanish',
				'Mexican',
				'Moroccan',
			],
		},
		level: {
			type: String,
			required: [true, 'Please select a level of difficulty'],
			enum: ['Easy', 'Intermediate', 'Advanced'],
		},
		prepTime: {
			type: Number,
			required: [true, 'Please enter an estimate of preparation time'],
		},
		cookTime: {
			type: Number,
			required: [true, 'Please an estimate of cook time'],
		},
		ingredients: {
			type: [String],
			required: [
				true,
				'Please add the appropriate ingredients for this recipe',
			],
		},
		groups: {
			type: [String],
			required: [true, 'Please add an appropriate group for you recipe'],
			enum: ['fruits', 'vegetables', 'grains', 'protein foods', 'dairy'],
		},
		steps: {
			type: [String],
			required: [true, 'Please add the necessary steps to prepare this recipe'],
		},
		averageRating: {
			type: Number,
			min: [1, 'Rating must be at least 1'],
			max: [5, 'Rating cannot be more than 5'],
		},
	},
	{ timestamps: true }
)

recipeSchema.statics.getAverageRating = async function (userId) {
	const obj = await this.aggregate([
		{ $match: { user: userId } },
		{ $group: { _id: '$user', averageRating: { $avg: '$averageRating' } } },
	])

	try {
		await this.model('User').findByIdAndUpdate(userId, {
			averageRating: obj[0].averageRating,
		})
	} catch (error) {
		console.error(error)
	}
}

recipeSchema.post('save', function () {
	this.constructor.getAverageRating(this.user)
})

recipeSchema.pre('remove', function () {
	this.constructor.getAverageRating(this.user)
})

// Cascade delete reviews when a recipe is deleted
recipeSchema.pre('remove', async function () {
	await this.model('Review').deleteMany({ recipe: this._id })
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe
