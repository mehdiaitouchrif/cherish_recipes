import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import {
	getUserDetails,
	updateDetails,
	updatePassword,
	sendConfirmationEmail,
	deleteUserAccount,
} from '../actions/authActions'
import { listUserRecipes } from '../actions/recipeActions'
import { listUserReviews } from '../actions/reviewActions'
import { UPDATE_PASSWORD_RESET } from '../constants/authConstants'
import Container from '../components/layout/Container'
import MainHeader from '../components/layout/MainHeader'
import Alert from '../components/complements/Alert'
import Loader from '../components/complements/Loader'
import Recipe from '../components/recipes/Recipe'
import Review from '../components/auth/Review'
import Create from '../components/recipes/Create'
import Badge from '../components/complements/Badge'
import SkeletonRecipe from '../components/skeletons/SkeletonRecipe'
import SkeletonReview from '../components/skeletons/SkeletonReview'
import Meta from '../components/complements/Meta'

const Profile = ({ match }) => {
	// Switching Tabs
	const [active, setActive] = useState('recipes')
	const [showPasswordForm, setShowPasswordForm] = useState(false)

	// Form fields for details
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')

	// For password
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [showAlert, setShowAlert] = useState(false)

	// For photo upload
	const [uploading, setUploading] = useState(false)
	const [uploadErr, setUploadErr] = useState(false)

	// Brining user info & details
	const userLogin = useSelector((state) => state.userLogin)
	const { loading: infoLoading, userInfo } = userLogin

	const userDetails = useSelector((state) => state.userDetails)
	const { error: detailsError, user } = userDetails

	const detailsUpdate = useSelector((state) => state.detailsUpdate)
	const { loading: updateLoading, error: updateError, success } = detailsUpdate

	const passwordUpdate = useSelector((state) => state.passwordUpdate)
	const {
		loading: passwordLoading,
		error: passwordError,
		success: passwordSuccess,
	} = passwordUpdate

	// Recipe delete
	const recipeDelete = useSelector((state) => state.recipeDelete)
	const { success: deleteSuccess } = recipeDelete

	// Triggers details update
	const updateDetailsHandler = (e) => {
		e.preventDefault()
		dispatch(updateDetails({ firstName, lastName, email }))
	}

	// Update password
	const updatePasswordHandler = (e) => {
		e.preventDefault()
		// Update pass here
		if (newPassword !== confirmPassword) {
			setShowAlert(true)
		}

		setShowAlert(false)
		dispatch({ type: UPDATE_PASSWORD_RESET })
		dispatch(updatePassword(currentPassword, newPassword))
	}

	// Confirmation email
	const handleConfirmationEmail = () => {
		dispatch(sendConfirmationEmail())
	}

	const emailConfirmation = useSelector((state) => state.emailConfirmation)
	const {
		loading: emailLoading,
		error: emailError,
		success: emailSuccess,
	} = emailConfirmation

	const userConfirmEmail = useSelector((state) => state.userConfirmEmail)
	const {
		loading: confirmEmailLoading,
		success: confirmEmailSuccess,
	} = userConfirmEmail

	// Upload Profile photo
	const uploadPhoto = async (e) => {
		const file = e.target.files[0]

		const formData = new FormData()
		formData.append('profilePhoto', file)

		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}

			const { data } = await axios.post(
				'/api/v1/upload/profile',
				formData,
				config
			)
			setUploading(false)
			dispatch(updateDetails({ photo: data }))
			window.location.reload()
		} catch (error) {
			console.error(error)
			setUploading(false)
			setUploadErr(true)
		}
	}

	// Delete  account
	const accountDelete = useSelector((state) => state.accountDelete)
	const {
		success: deleteAccountSuccess,
		loading: deleteAccountLoading,
	} = accountDelete

	const handleAccountDelete = () => {
		if (window.confirm('Are you sure')) {
			dispatch(deleteUserAccount())
		}
	}

	// Triger user details & redirects
	const history = useHistory()
	const dispatch = useDispatch()

	// Bring in user recipes
	const userRecipes = useSelector((state) => state.userRecipes)
	const { loading: recipesLoading, recipes } = userRecipes

	// Bring in reviews
	const userReviews = useSelector((state) => state.userReviews)
	const { loading: reviewsLoading, reviews } = userReviews

	useEffect(() => {
		if (!infoLoading && !userInfo) {
			history.push('/')
		} else {
			if (!user || success) {
				dispatch(getUserDetails())
			} else {
				setFirstName(user.firstName)
				setLastName(user.lastName)
				setEmail(user.email)
				dispatch(listUserRecipes(user._id))
				dispatch(listUserReviews(user._id))

				if (deleteSuccess) {
					dispatch(listUserRecipes(user._id))
				}

				if (active === 'recipes') {
					dispatch(listUserRecipes(user._id))
				}

				if (deleteAccountSuccess) {
					window.location.href = '/'
				}

				if (confirmEmailSuccess) {
					dispatch(getUserDetails())
				}
			}
		}
	}, [
		dispatch,
		userInfo,
		user,
		getUserDetails,
		deleteSuccess,
		active,
		deleteAccountSuccess,
		confirmEmailSuccess,
	])

	const arr = [1, 2, 3]
	return (
		<>
			<Meta
				title={`Cherish Recipes | ${user && user.firstName} ${
					user && user.lastName
				}`}
			/>
			<MainHeader />
			<Container>
				<div className='profile'>
					<div className='profile__header'>
						<div className='profile__image'>
							<div>
								<img
									alt='user photo'
									src={user && user.photo}
									alt={user && user.lastName}
								/>
								<p>
									{user && user.firstName} {user && user.lastName}{' '}
								</p>
							</div>
							<label class='profile-upload'>
								<input type='file' onChange={uploadPhoto} />
								<i class='fas fa-camera fa-2x'></i>
							</label>
						</div>

						<div className='profile__confirmation'>
							<Badge type={user && user.isEmailConfirmed ? 'info' : 'danger'}>
								{user && user.isEmailConfirmed ? 'Verified' : 'Not verified'}{' '}
							</Badge>
							{user && !user.isEmailConfirmed && (
								<div className='d-flex flex-align flex-column'>
									<button
										onClick={handleConfirmationEmail}
										className='btn btn-primary rounded '
									>
										<p>Re-send confirmation email</p>
									</button>
									{emailLoading && <Loader type='medium white' />}
								</div>
							)}
							{confirmEmailLoading && <Loader />}
							{emailError && <Alert type='danger'>{emailError} </Alert>}
							{emailSuccess && (
								<Alert type='info'>Email sent sucessfully</Alert>
							)}
						</div>
					</div>
					{detailsError && <Alert type='danger'>{detailsError}</Alert>}

					<div className='profile__grids'>
						<div className='profile__aside'>
							<p className='lead uppercase text-muted'>Activity</p>
							<div
								onClick={() => setActive('recipes')}
								className={active === 'recipes' && 'active'}
							>
								Recipes
							</div>
							<div
								onClick={() => setActive('reviews')}
								className={active === 'reviews' && 'active'}
							>
								Reviews
							</div>

							<div
								onClick={() => setActive('create')}
								className={active === 'create' && 'active'}
							>
								Create Recipe
							</div>

							<div
								onClick={() => setActive('edit')}
								className={active === 'edit' && 'active'}
							>
								Edit Profile
							</div>
						</div>
						<div className='profile__content'>
							<p className='lead uppercase text-muted'>{active}</p>
							{/* For now */}
							{active === 'edit' ? (
								<div className='profile__content-edit'>
									<p className='lead mt-1'>Edit account information</p>
									<form onSubmit={updateDetailsHandler}>
										{success && (
											<div className='my-1'>
												<Alert type='success'>Updated with success</Alert>
											</div>
										)}
										<input
											type='text'
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
										<input
											type='text'
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
										<input
											type='text'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
										<button className='btn btn-primary btn-lg rounded'>
											Update details
										</button>
									</form>
									<div
										className='btn btn-gray'
										onClick={() => setShowPasswordForm(!showPasswordForm)}
									>
										Change password{' '}
										<i
											className={`fas fa-chevron-${
												showPasswordForm ? 'up' : 'down'
											}`}
										></i>{' '}
									</div>
									{showPasswordForm && (
										<form className='mb-1' onSubmit={updatePasswordHandler}>
											{showAlert && (
												<Alert type='danger'>
													Please enter matching passwords{' '}
												</Alert>
											)}

											{passwordLoading && <Loader />}
											{passwordError && (
												<Alert type='danger'>{passwordError}</Alert>
											)}
											{passwordSuccess && (
												<Alert type='success'>Password updated </Alert>
											)}
											<input
												type='password'
												placeholder='Current password'
												value={currentPassword}
												className='mt-1'
												onChange={(e) => setCurrentPassword(e.target.value)}
											/>
											<input
												type='password'
												placeholder='New password'
												value={newPassword}
												onChange={(e) => setNewPassword(e.target.value)}
											/>
											<input
												type='password'
												placeholder='Confirm password'
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
											/>
											{updateLoading && <Loader />}
											{updateError && (
												<Alert type='danger'>{updateError}</Alert>
											)}
											<button className='btn btn-lg btn-primary rounded'>
												Change password{' '}
											</button>
										</form>
									)}
									<div className='py-1 border-top'>
										{deleteAccountLoading && <Loader />}
										<button
											onClick={handleAccountDelete}
											className='btn btn-lg btn-primary rounded'
										>
											Delete my account
										</button>
									</div>
								</div>
							) : active === 'recipes' ? (
								recipes.length > 0 && user ? (
									<div className='grid grid-3 my-1'>
										{recipes.map((recipe) => (
											<Recipe key={recipe._id} recipe={recipe} user={user} />
										))}
									</div>
								) : recipesLoading ? (
									<div className='grid grid-3'>
										{arr.map((i) => (
											<SkeletonRecipe key={i} />
										))}
									</div>
								) : (
									<div className='text-center profile__content-nothing'>
										<img alt='Nothing found' src={`/images/no-${active}.png`} />
										<p className='lead my-2'>Nothing here yet</p>
									</div>
								)
							) : active == 'reviews' ? (
								reviews.length > 0 ? (
									<div className='grid grid-3'>
										{reviews.map((review) => (
											<Review review={review} key={review._id} />
										))}
									</div>
								) : reviewsLoading ? (
									<div className='grid grid-3'>
										{arr.map((i) => (
											<SkeletonReview key={i} />
										))}
									</div>
								) : (
									<div className='text-center profile__content-nothing'>
										<img alt='Nothing found' src={`/images/no-${active}.png`} />
										<p className='lead my-2'>Nothing here yet</p>
									</div>
								)
							) : active == 'create' ? (
								<Create />
							) : (
								<div className='text-center profile__content-nothing'>
									<img alt='Nothing found' src={`/images/no-${active}.png`} />
									<p className='lead my-2'>Nothing here yet</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}

export default Profile
