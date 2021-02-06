import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		recipe: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Recipe',
		},
		title: {
			type: String,
			trim: true,
			required: [true, 'Please add a title for the review'],
			maxlength: 50,
		},
		text: {
			type: String,
			required: [true, 'Please add your review text'],
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: [true, 'Please add a rating between 1 and 5'],
		},
	},
	{ timestamps: true }
)

reviewSchema.index({ recipe: 1, user: 1 }, { unique: true })

reviewSchema.statics.getAverageRating = async function (recipeId) {
	const obj = await this.aggregate([
		{ $match: { recipe: recipeId } },
		{ $group: { _id: '$recipe', averageRating: { $avg: '$rating' } } },
	])

	try {
		await this.model('Recipe').findByIdAndUpdate(recipeId, {
			averageRating: obj[0].averageRating,
		})
	} catch (error) {
		console.error(error)
	}
}

reviewSchema.post('save', function () {
	this.constructor.getAverageRating(this.recipe)
})

reviewSchema.pre('remove', function () {
	this.constructor.getAverageRating(this.recipe)
})

const Review = mongoose.model('Review', reviewSchema)

export default Review
