import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listRecipes, addToViewed } from '../../actions/recipeActions'
import Alert from '../complements/Alert'
import Recipe from './Recipe'
import SkeletonRecipe from '../skeletons/SkeletonRecipe'
import Skeleton from '../skeletons/Skeleton'

const Recipes = () => {
	const dispatch = useDispatch()

	const recipeList = useSelector((state) => state.recipeList)
	const arr = [1, 2, 3, 4, 5, 6, 7, 8]

	// From Local storage
	const recentlyViewed = useSelector((state) => state.recentlyViewed)
	const { recentlyViewed: recipesFromLs } = recentlyViewed

	const { loading, error, recipes } = recipeList

	const handleAddToViewed = (recipeId) => {
		dispatch(addToViewed(recipeId))
	}

	useEffect(() => {
		if (!recipes || recipes.length === 0) {
			dispatch(listRecipes())
		}
	}, [dispatch])

	return (
		<>
			<section className='recipes' id='recipes'>
				{recipesFromLs.length > 0 && (
					<>
						<h2 className='primary-heading my-1'>Recently viewed</h2>

						<div className='grid grid-4 mb-2'>
							{recipesFromLs.slice(0, 4).map((recipe) => (
								<Recipe recipe={recipe} key={recipe._id} />
							))}
						</div>
					</>
				)}

				{loading ? (
					<>
						<Skeleton type='title' />
						<div className='grid grid-4'>
							{arr.map((i) => (
								<SkeletonRecipe key={i} />
							))}
						</div>
					</>
				) : error ? (
					<Alert type='danger'>{error}</Alert>
				) : (
					<>
						<h2 className='primary-heading my-1'>Latest recipes</h2>
						<div className='mb-2'>
							{recipes.slice(0, 8).map((recipe) => (
								<Link
									onClick={() => handleAddToViewed(recipe._id)}
									key={recipe._id}
									to={`/recipe/${recipe._id}`}
								>
									<div className='recipe'>
										<img
											className='recipe__image'
											src={recipe.images[0]}
											alt={recipe.name}
										/>
										<p className='recipe__name'>{recipe.name} </p>
										<div className='recipe__owner'>
											<img
												src={recipe.user.photo}
												alt={recipe.user.firstName}
											/>
											<p>
												{recipe.user.firstName} {recipe.user.lastName}
											</p>
										</div>
									</div>
								</Link>
							))}
						</div>
					</>
				)}
			</section>
			<div className='text-center'>
				<Link to='/search' className='btn btn-lg btn-info rounded'>
					See more
				</Link>
			</div>
		</>
	)
}

export default Recipes
