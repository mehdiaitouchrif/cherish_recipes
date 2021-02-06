import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listRecipeDetails } from '../actions/recipeActions'
import Alert from '../components/complements/Alert'
import MainHeader from '../components/layout/MainHeader'
import Create from '../components/recipes/Create'

// Get recipe details & pass details to create
const EditRecipe = ({ match, history }) => {
	const recipeId = match.params.recipeId

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin
	const recipeDetails = useSelector((state) => state.recipeDetails)
	const { error, recipe } = recipeDetails

	const dispatch = useDispatch()

	useEffect(() => {
		if (!userInfo) {
			history.push('/')
		} else {
			dispatch(listRecipeDetails(recipeId))
		}
	}, [dispatch, history, listRecipeDetails, userInfo])
	return (
		<>
			<MainHeader />
			<div className='container container--tight'>
				<h2 className='primary-heading'>Edit Recipe #{recipeId} </h2>
				{error && <Alert type='danger'>{error}</Alert>}
				<Create recipe={recipe} />
			</div>
		</>
	)
}

export default EditRecipe
