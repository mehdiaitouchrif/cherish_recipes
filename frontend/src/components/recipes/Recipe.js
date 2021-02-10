import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { addToViewed, deleteRecipe } from '../../actions/recipeActions'

const Recipe = ({ recipe, user }) => {
	const location = useLocation()
	const [showButtons, setShowButtons] = useState(false)

	const dispatch = useDispatch()
	const deleteRecipeHandler = (id) => {
		dispatch(deleteRecipe(id))
	}

	// Handle update / redirect
	const history = useHistory()
	const handleUpdate = (recipeId) => {
		return history.push(`/recipe/${recipeId}/edit`)
	}

	// Add to viewed
	const handleAddToViewed = (recipeId) => {
		dispatch(addToViewed(recipeId))
	}

	useEffect(() => {
		if (location.pathname.includes('profile')) {
			setShowButtons(true)
		}
	}, [location])
	return (
		<div className='recipe' onClick={() => handleAddToViewed(recipe._id)}>
			<Link to={`/recipe/${recipe._id}`}>
				<img
					className='recipe__image'
					src={recipe.images[0]}
					alt={recipe.name}
				/>
				<p className='recipe__name'>{recipe.name} </p>
				<div className='recipe__owner'>
					<img
						src={user ? user.photo : recipe.user.photo}
						alt={user ? user.firstName : recipe.user.firstName}
					/>
					<p>
						{user ? user.firstName : recipe.user.firstName}{' '}
						{user ? user.lastName : recipe.user.lastName}
					</p>
				</div>
			</Link>
			{showButtons && (
				<>
					<button
						className='btn btn-info rounded'
						onClick={() => handleUpdate(recipe._id)}
					>
						Update
					</button>
					<button
						className='btn btn-danger rounded'
						onClick={() => deleteRecipeHandler(recipe._id)}
					>
						Delete
					</button>
				</>
			)}
		</div>
	)
}

export default Recipe
