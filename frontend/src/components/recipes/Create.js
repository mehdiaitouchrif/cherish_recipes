import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createRecipe, updateRecipe } from '../../actions/recipeActions'
import Alert from '../complements/Alert'
import Loader from '../complements/Loader'
import { useHistory } from 'react-router-dom'
import { RECIPE_UPDATE_RESET } from '../../constants/recipeConstants'
import { getSignedRequest } from '../../actions/uploadActions'

const Create = ({ recipe }) => {
	// Recipe form fields
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [ingredients, setIngredients] = useState([])
	const [steps, setSteps] = useState([])
	const [images, setImages] = useState([])
	const [level, setLevel] = useState('Easy') // Select menu
	const [cuisine, setCuisine] = useState('Moroccan') // Select menu
	const [groups, setGroups] = useState([]) // Checkbox
	const [prepTime, setPrepTime] = useState(0)
	const [cookTime, setCookTime] = useState(0)

	// Images upload
	const [uploading, setUploading] = useState(false)
	const [uploadErr, setUploadErr] = useState(false)

	// Steps form
	const [step, setStep] = useState('')
	const handleSteps = (e) => {
		e.preventDefault()
		setSteps([...steps, step])
		setStep('')
	}

	const deleteStep = (stp) => {
		const stepsCopy = [...steps]
		const newSteps = stepsCopy.filter((st) => st !== stp)
		setSteps(newSteps)
	}

	// Ingredients Form
	const [ingredient, setIngredient] = useState('')
	const handleIngredients = (e) => {
		e.preventDefault()
		setIngredients([...ingredients, ingredient])
		setIngredient('')
	}

	const deleteIngredient = (ing) => {
		const ingredientsCopy = [...ingredients]
		const newIngredients = ingredientsCopy.filter((ingre) => ingre !== ing)
		setIngredients(newIngredients)
	}

	// Handle checkbox
	const groupsArr = ['dairy', 'fruits', 'protein foods', 'vegetables', 'grains']
	const handleCheckbox = (e) => {
		const value = e.target.value
		const checked = e.target.checked

		if (checked) {
			setGroups([...groups, value])
		} else {
			const groupsCopy = [...groups]
			const newGroups = groupsCopy.filter((grp) => grp !== value)
			setGroups(newGroups)
		}
	}

	// Brining user info & details
	const userLogin = useSelector((state) => state.userLogin)
	const { loading: infoLoading, userInfo } = userLogin

	const recipeCreate = useSelector((state) => state.recipeCreate)
	const { loading: createLoading, error: createError, success } = recipeCreate

	const recipeUpdate = useSelector((state) => state.recipeUpdate)
	const {
		loading: updateLoading,
		error: updateError,
		success: updateSuccess,
	} = recipeUpdate

	const [showMessage, setShowMessage] = useState(false)

	const dispatch = useDispatch()

	// Upload Profile photo
	const signedRequest = useSelector((state) => state.signedRequest)
	const {
		loading: signedRequestLoading,
		error: signedRequestErr,
	} = signedRequest

	const fileUpload = useSelector((state) => state.fileUpload)
	const { data: fileUrl, resource, error: fileUploadError } = fileUpload

	const uploadRecipeImages = (e) => {
		Object.keys(e.target.files).map((key) =>
			dispatch(getSignedRequest(e.target.files[key], 'recipe'))
		)
	}

	// Create a new recipe
	const handleCreate = () => {
		const recipeData = {
			name,
			description,
			cuisine,
			level,
			cookTime,
			prepTime,
			steps,
			ingredients,
			groups,
			images,
		}
		if (recipe && recipe.name) {
			dispatch(updateRecipe(recipe._id, recipeData))
			setShowMessage(false)
			console.log(recipeData)
		} else {
			dispatch(createRecipe(recipeData))
			setShowMessage(false)
		}
	}

	const history = useHistory()
	useEffect(() => {
		if (success) {
			setShowMessage(true)

			setTimeout(() => {
				setShowMessage(false)
			}, 3000)
		}

		if (recipe && recipe.name) {
			// Recipe form fields
			setName(recipe.name)
			setDescription(recipe.description)
			setIngredients(recipe.ingredients)
			setSteps(recipe.steps)
			setImages(recipe.images)
			setLevel(recipe.level)
			setCuisine(recipe.cuisine)
			setGroups(recipe.groups)
			setCookTime(recipe.cookTime)
			setPrepTime(recipe.prepTime)
		}

		if (updateSuccess) {
			history.push(`/profile/${recipe.user}`)
			dispatch({ type: RECIPE_UPDATE_RESET })
		}

		if (fileUrl && resource === 'recipe') {
			setImages([...images, fileUrl])
		}
	}, [dispatch, userInfo, success, recipe, history, updateSuccess, fileUrl])

	return (
		<div className='create'>
			<form onSubmit={handleCreate}>
				<input
					type='text'
					value={name}
					placeholder='Recipe name'
					onChange={(e) => setName(e.target.value)}
				/>
				<textarea
					placeholder='Recipe description'
					value={description}
					rows={4}
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				<div className='create__selects'>
					<label htmlFor='level'>
						Select level
						<select
							name='level'
							value={level}
							onChange={(e) => setLevel(e.target.value)}
						>
							<option value='Easy'>Easy</option>
							<option value='Intermediate'>Intermediate</option>
							<option value='Advanced'>Advanced</option>
						</select>
					</label>
					<label htmlFor='cuisine'>
						Select cuisine
						<select
							name='cuisine'
							value={cuisine}
							onChange={(e) => setCuisine(e.target.value)}
						>
							<option value='Moroccan'>Moroccan</option>
							<option value='Mexican'>Mexican</option>
							<option value='Spanish'>Spanish</option>
							<option value='Chinese'>Chinese</option>
							<option value='Japanese'>Japanese</option>
							<option value='Indian'>Indian</option>
							<option value='American'>American</option>
							<option value='Turkish'>Turkish</option>
							<option value='Thai'>Thai</option>
							<option value='French'>French</option>
							<option value='Italian'>Italian</option>
						</select>
					</label>
				</div>
				<div className='create__times'>
					<label htmlFor='prepTime'>
						<p className='my-half'>Preparation time</p>
						<input
							name='prepTime'
							type='text'
							placeholder='Ente preparation time'
							value={prepTime}
							onChange={(e) => setPrepTime(e.target.value)}
						/>
					</label>
					<label htmlFor='cookTime'>
						<p className='my-half'>Cooking time</p>
						<input
							type='text'
							placeholder='Ente cooking time'
							value={cookTime}
							onChange={(e) => setCookTime(e.target.value)}
						/>
					</label>
				</div>
				<div className='create__groups'>
					<p className='lead my-half'>Select groups</p>
					<div>
						{groupsArr.map((gr) => (
							<label key={gr + Math.random()} className='checkbox-container'>
								{gr}
								<input onChange={handleCheckbox} type='checkbox' value={gr} />
								<span className='checkmark'></span>
							</label>
						))}
					</div>
				</div>
				{uploadErr && <Alert type='danger'>Upload Error </Alert>}
				{uploading && <Loader />}
				<p className='lead mt-1'>Add images</p>
				<label className='custom-file-upload'>
					<input type='file' multiple onChange={uploadRecipeImages} />
					<i className='fa fa-images'></i>
					{'  '} Import
				</label>
				<div className='create__images'>
					{images.length > 0 &&
						!signedRequestLoading &&
						images.map((image, index) => (
							<div key={index + Math.random()} className='create__image'>
								<img src={image} key={image} alt={image} />
								<i
									onClick={() =>
										setImages(images.filter((img, idx) => idx !== index))
									}
									className='fas fa-times'
								></i>
							</div>
						))}
					{signedRequestErr && <Alert type='danger'>{signedRequestErr} </Alert>}
					{fileUploadError && <Alert type='danger'>{fileUploadError} </Alert>}
					{signedRequestLoading && <Loader type='medium' />}
				</div>
			</form>

			{/* Ingredients & Steps Forms */}
			<div className='grid grid-2'>
				<div>
					<h2 className='tertiary-heading'>Steps</h2>
					<form onSubmit={handleSteps}>
						<input
							placeholder='Enter steps'
							type='text'
							value={step}
							onChange={(e) => setStep(e.target.value)}
						/>
					</form>
					<ul className='mb-3'>
						{steps.map((step, index) => (
							<div key={step + index}>
								<li key={index}>
									<i className='fas fa-dot-circle'></i> {step}{' '}
								</li>
								<i
									className='fas fa-times ml-2'
									onClick={() => deleteStep(step)}
								></i>
							</div>
						))}
					</ul>
				</div>
				<div>
					<h2 className='tertiary-heading'>Ingredients</h2>
					<form onSubmit={handleIngredients}>
						<input
							placeholder='Enter ingredients'
							type='text'
							value={ingredient}
							onChange={(e) => setIngredient(e.target.value)}
						/>
					</form>
					<ul>
						{ingredients.map((ing, index) => (
							<div key={ing + index}>
								<li key={index}>
									<i className='fas fa-dot-circle'></i> {ing}{' '}
								</li>
								<i
									className='fas fa-times ml-2'
									onClick={() => deleteIngredient(ing)}
								></i>
							</div>
						))}
					</ul>
				</div>
			</div>
			{showMessage && <Alert type='success'>Recipe created</Alert>}

			{createError ||
				(updateError && <Alert type='danger'>{createError}</Alert>)}
			{createLoading || (updateLoading && <Loader />)}

			<button
				className='btn btn-lg btn-primary my-3 d-block'
				onClick={handleCreate}
			>
				{recipe && recipe.name ? 'Update Recipe' : 'Create Recipe'}
			</button>
		</div>
	)
}

export default Create
