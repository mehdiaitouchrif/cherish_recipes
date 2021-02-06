import express from 'express'
import {
	addReview,
	deleteReview,
	getReview,
	getReviews,
	updateReview,
} from '../controllers/reviewController.js'
import requireAuth from '../middleweare/requireAuth.js'
const router = express.Router({ mergeParams: true })

router.route('/').get(getReviews).post(requireAuth, addReview)
router
	.route('/:id')
	.get(getReview)
	.put(requireAuth, updateReview)
	.delete(requireAuth, deleteReview)

export default router
