import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { listRecipeDetails } from '../actions/recipeActions'
import {
	listRecipeReviews,
	createReview,
	deleteReview,
	updateReview,
	getSingleReview,
} from '../actions/reviewActions'
import Meta from '../components/complements/Meta'
import Rating from '../components/recipes/Rating'
import Container from '../components/layout/Container'
import MainHeader from '../components/layout/MainHeader'
import Alert from '../components/complements/Alert'
import Loader from '../components/complements/Loader'
import { getUserDetails } from '../actions/authActions'
import {
	REVIEW_CREATE_RESET,
	REVIEW_DELETE_RESET,
} from '../constants/reviewConstants'
import SkeletonReview from '../components/skeletons/SkeletonReview'
import Badge from '../components/complements/Badge'
import { Link } from 'react-router-dom'

const RecipePage = ({ match, location }) => {
	const dispatch = useDispatch()
	const redirect = location.pathname ? location.pathname : '/'

	const recipeDetails = useSelector((state) => state.recipeDetails)
	const { loading, error, recipe } = recipeDetails

	// Bring in reviews
	const recipeReviews = useSelector((state) => state.recipeReviews)
	const {
		loading: reviewsLoading,
		error: reviewsError,
		reviews,
	} = recipeReviews

	// Review create state
	const reviewCreate = useSelector((state) => state.reviewCreate)
	const { success, loading: createLoading, error: createError } = reviewCreate

	// Review delete status
	const reviewDelete = useSelector((state) => state.reviewDelete)
	const { success: deleteSuccess } = reviewDelete

	// Handle review update
	// Get single review
	const singleReview = useSelector((state) => state.singleReview)
	const { loading: reviewLoading, error: reviewError, review } = singleReview

	const [reviewId, setReviewId] = useState(null)
	const handleUpdate = (revId) => {
		setReviewId(revId)
		dispatch(getSingleReview(revId))
		setUpdateState(true)
	}

	// Bring in update review state
	const reviewUpdate = useSelector((state) => state.reviewUpdate)
	const {
		loading: updateLoading,
		error: updateError,
		success: updateSuccess,
	} = reviewUpdate

	// Handle review creation
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [rating, setRating] = useState('Please select a rating')
	const [showRatingError, setShowRatingError] = useState(false)
	const [updateState, setUpdateState] = useState(false)
	const createReviewHanlder = (e) => {
		e.preventDefault()
		if (rating === 'Please select a rating') {
			setShowRatingError(true)
		} else if (updateState) {
			dispatch(updateReview(reviewId, { title, text, rating: Number(rating) }))
			setShowRatingError(false)
			setText('')
			setTitle('')
			setRating('Please select a rating')
		} else {
			dispatch(
				createReview(match.params.id, { title, text, rating: Number(rating) })
			)
			dispatch({ type: REVIEW_CREATE_RESET })
			setShowRatingError(false)
			setText('')
			setTitle('')
			setRating('Please select a rating')
		}
	}

	// Handle review deletion
	const deleteReviewHandler = (reviewId) => {
		dispatch(deleteReview(reviewId))
		dispatch({ type: REVIEW_DELETE_RESET })
	}

	// Bring in userLogin
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	// Bring in current user for review update & deletion
	const userDetails = useSelector((state) => state.userDetails)
	const { error: userError, loading: userLoading, user } = userDetails

	useEffect(() => {
		if (!user) {
			// // Get currenlty logged in user to check if he owns the review
			dispatch(getUserDetails())
		}

		// Loaded recipe & reviews
		if (!recipe || !recipe.name || recipe._id !== match.params.id) {
			dispatch(listRecipeDetails(match.params.id))
		}

		if (!reviews || !review.rating) {
			dispatch(listRecipeReviews(match.params.id))
		}

		// // Creation uccess
		if (success || updateSuccess) {
			dispatch(listRecipeReviews(match.params.id))
		}

		// deletion success
		if (deleteSuccess) {
			dispatch({ type: REVIEW_DELETE_RESET })
		}

		// Put review data in form
		if (review && review.rating) {
			setRating(review.rating)
			setTitle(review.title)
			setText(review.text)
		}
	}, [dispatch, success, deleteSuccess, review, updateSuccess])

	const [activeImage, setActiveImage] = useState(0)

	const arr = [1, 2, 3]

	return (
		<>
			<MainHeader />
			<Container>
				<Link to='/' className='btn  btn-primary'>
					<i
						style={{ color: '#fff', marginRight: '8px' }}
						className='fas fa-arrow-left '
					></i>
					GO BACK
				</Link>
				{error ? (
					<Alert type='danger'>{error}</Alert>
				) : loading ? (
					<div className='text-center mt-3'>
						<Loader />
					</div>
				) : (
					<>
						<Meta
							title={`${recipe.name} by ${
								recipe.user && recipe.user.firstName
							} ${recipe.user && recipe.user.lastName} `}
						/>
						<div className='recipe-details' id='recipe-details'>
							<section className='recipe-details__generic'>
								<div className='recipe-details__introduction'>
									<div>
										<h2 className='secondary-heading'>{recipe.name}</h2>
										<div>
											<Rating
												value={recipe.averageRating}
												numReviews={reviews.length}
											/>
										</div>
									</div>
									<div className='recipe-details__owner'>
										<img
											src={recipe.user && recipe.user.photo}
											alt={recipe.name}
										/>
										<p>
											{recipe.user && recipe.user.firstName}{' '}
											{recipe.user && recipe.user.lastName}
										</p>
									</div>
									<div className='d-flex'>
										<Badge type='info'>{recipe.cuisine}</Badge>
										{recipe.groups &&
											recipe.groups.map((gr) => (
												<Badge type='info' key={gr}>
													{gr}
												</Badge>
											))}
									</div>
									<div className='recipe-details__information'>
										<div>
											<h2>{recipe.ingredients && recipe.ingredients.length}</h2>
											<p>Ingredients</p>
										</div>
										<div>
											<h2>{recipe.prepTime}</h2>
											<p>Minutes to prepare</p>
										</div>
										<div>
											<h2>{recipe.cookTime}</h2>
											<p>
												{recipe.cookTime <= 2 ? 'Hours' : 'Minutes'} to cook
											</p>
										</div>
									</div>
								</div>
								<div className='recipe-details__images'>
									<div className='recipe-details__images-active'>
										<img
											src={recipe.images && recipe.images[activeImage]}
											alt={recipe.name}
										/>
									</div>
									<div className='recipe-details__images-select'>
										{recipe.images &&
											recipe.images.map((image, index) => (
												<img
													alt='Active image'
													key={index}
													onClick={() => setActiveImage(index)}
													src={image}
												/>
											))}
									</div>
								</div>
							</section>
							<section className='recipe-details__depth'>
								<h2 className='tertiary-heading '>Description</h2>
								<p>{recipe.description}</p>
								<h2 className='tertiary-heading '>Ingredients</h2>
								<ul>
									{recipe.ingredients &&
										recipe.ingredients.map((ingredient) => (
											<li key={ingredient}>
												<i className='far fa-dot-circle'></i> {ingredient}
											</li>
										))}
								</ul>
								<h2 className='tertiary-heading'>Steps</h2>
								<ul className='border-bottom pb-1'>
									{recipe.steps &&
										recipe.steps.map((step) => (
											<li key={step}>
												<i className='fas fa-utensils'></i> {step}
											</li>
										))}
								</ul>
								<div className='d-flex flex-align'>
									<h2 className='tertiary-heading'>Reviews</h2>
									<Rating
										value={recipe.averageRating}
										numReviews={reviews.length}
									/>
								</div>

								{!userInfo && (
									<p className='lead'>
										To add a review please{' '}
										<Link
											to={redirect ? `/login?redirect=${redirect}` : '/login'}
										>
											<strong className='primary'>Login</strong>
										</Link>{' '}
										or{' '}
										<Link
											to={redirect ? `/signup?redirect=${redirect}` : '/login'}
										>
											<strong className='primary'>Sign up</strong>
										</Link>
									</p>
								)}
								{userInfo && (
									<div className='create-rating'>
										<p className='lead'>Give it a review</p>
										<form onSubmit={createReviewHanlder}>
											<select
												value={rating}
												onChange={(e) => setRating(e.target.value)}
											>
												<option value='Please select a rating'>
													Please select a rating
												</option>

												<option value='5'>5 stars - Excellent</option>
												<option value='4'>4 stars - Very Good</option>
												<option value='3'>3 stars - Fair Enough</option>
												<option value='2'>2 stars - Bad</option>
												<option value='1'>1 star - Very Bad</option>
											</select>
											<input
												type='text'
												placeholder='Review title'
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/>
											<textarea
												rows={2}
												placeholder='Review text'
												value={text}
												onChange={(e) => setText(e.target.value)}
											></textarea>
											{showRatingError && (
												<Alert type='danger'>Please select a rating </Alert>
											)}
											{createLoading && <Loader />}
											{createError && createError.includes('E11000') ? (
												<Alert type='danger'>
													You have already reviewed this recipe. Your can edit
													your existing review or delete it and create a new one{' '}
												</Alert>
											) : (
												createError &&
												setTimeout(() => {
													return <Alert type='danger'>{createError} </Alert>
												}, 3000)
											)}
											<button className='btn btn-primary rounded'>
												Submit Review
											</button>
										</form>
									</div>
								)}

								{reviewsLoading && arr.map((i) => <SkeletonReview key={i} />)}
								{reviewsError && <Alert type='danger'>{reviewsError} </Alert>}
								{reviews.map((review) => (
									<div className='review-recipe' key={review._id}>
										<div className='review-recipe__image'>
											<img src={review.user.photo} alt={review.user.lastName} />
										</div>
										<div className='review-recipe__body'>
											<div>
												<div className='d-flex flex-align'>
													<p>
														{review.user.firstName} {review.user.lastName}{' '}
													</p>
													<span className='review-recipe__createdAt'>
														{moment(review.createdAt).fromNow()}{' '}
													</span>
												</div>
												<Rating value={review.rating} />
											</div>
											<div>
												<p className='review-recipe__title'>{review.title} </p>
												<p>{review.text} </p>
												{user && user._id === review.user._id && (
													<>
														<button
															onClick={() => deleteReviewHandler(review._id)}
															className='btn rounded btn-danger'
														>
															Delete
														</button>
														<button
															className='btn rounded btn-info'
															onClick={() => handleUpdate(review._id)}
														>
															Edit
														</button>
													</>
												)}
											</div>
										</div>
									</div>
								))}
							</section>
						</div>
					</>
				)}
			</Container>
		</>
	)
}

export default RecipePage
