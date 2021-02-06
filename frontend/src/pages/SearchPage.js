import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listFiltredRecipes } from '../actions/recipeActions'
import Recipe from '../components/recipes/Recipe'
import MainHeader from '../components/layout/MainHeader'
import Alert from '../components/complements/Alert'
import Paginate from '../components/complements/Paginate'
import SkeletonRecipe from '../components/skeletons/SkeletonRecipe'

const SearchPage = ({ match }) => {
	const { term, cuisine } = match.params

	const pageNumber = match.params.page || 1
	// Bring in recipes
	const recipeFiltred = useSelector((state) => state.recipeFiltred)
	const {
		loading: recipesLoading,
		error: recipesError,
		recipes,
		pages,
		page,
	} = recipeFiltred

	// Manage active filters
	const [activeRating, setActiveRating] = useState(' ')
	const [activeTerm, setActiveTerm] = useState(term)
	const [activeCuisine, setActiveCuisine] = useState(cuisine)
	const [sortByNewest, setSortByNewest] = useState(true)

	const [showSearchBox, setShowSearchBox] = useState(false)
	const [termVal, setTermVal] = useState('')

	const hanldeInput = (e) => {
		setActiveTerm(e.target.value)
		setTermVal(e.target.value)
	}

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(
			listFiltredRecipes(
				activeTerm,
				activeRating,
				pageNumber,
				activeCuisine,
				sortByNewest ? 'name' : 'createdAt'
			)
		)

		window.addEventListener('click', (e) => {
			if (e.target === document.querySelector('.input-box')) {
				setShowSearchBox(false)
			}
		})
	}, [
		dispatch,
		activeTerm,
		activeRating,
		activeCuisine,
		sortByNewest,
		pageNumber,
	])

	const arr = [1, 2, 3, 4, 5, 6, 7, 8]

	return (
		<>
			<MainHeader />
			<div className='search-page'>
				<div className='container'>
					{showSearchBox && (
						<div className='input-box'>
							<div className='input-box__container'>
								<input
									type='text'
									placeholder='Search recipes...'
									value={termVal}
									onChange={hanldeInput}
								/>
							</div>
						</div>
					)}
					{!showSearchBox && (
						<div className='search-box'>
							<i
								onClick={() => setShowSearchBox(true)}
								className='fas fa-search'
							></i>
						</div>
					)}
					<button className='filter'>
						<i className='fas fa-filter filterIcon'></i> Filters
					</button>
					{/* Sorting by date */}
					<button
						onClick={() => setSortByNewest(!sortByNewest)}
						className={`filter ${sortByNewest && 'active'}`}
					>
						Newest
						{sortByNewest && <i className='fas fa-times'></i>}
					</button>

					<button
						onClick={() => setSortByNewest(!setSortByNewest)}
						className={`filter ${!sortByNewest && 'active'}`}
					>
						Oldest
						{!sortByNewest && <i className='fas fa-times'></i>}
					</button>

					{/* Sorting by rating */}

					<button
						onClick={() => setActiveRating(4.5)}
						// When click this one set Active rating to a value
						className={`filter ${activeRating === 4.5}`}
					>
						Rating +4.5
					</button>
					<button
						onClick={() => setActiveRating(4)}
						// When click this one set Active rating to a value
						className={`filter ${activeRating === 4}`}
					>
						Rating +4
					</button>
					<button
						onClick={() => setActiveRating(3)}
						// When click this one set Active rating to a value
						className={`filter ${activeRating === 3}`}
					>
						Rating +3
					</button>

					{activeRating !== ' ' && (
						<button
							onClick={() => setActiveRating(' ')}
							className={`filter active`}
						>
							Rating {activeRating}
							<i className='fas fa-times'></i>
						</button>
					)}

					{/* Sorting by cuisines & groups */}
					<button className='filter '>Cuisines</button>

					{activeCuisine !== ' ' && (
						<button
							onClick={() => setActiveCuisine(' ')}
							className='filter active'
						>
							{activeCuisine} <i className='fas fa-times'></i>
						</button>
					)}

					{activeTerm !== ' ' && (
						<button
							onClick={() => setActiveTerm(' ')}
							className='filter active'
						>
							{activeTerm} <i className='fas fa-times'></i>
						</button>
					)}

					<div>
						{recipesLoading ? (
							<div className='recipes'>
								<div>
									{arr.map((i) => (
										<SkeletonRecipe key={i} />
									))}
								</div>
							</div>
						) : recipesError ? (
							<Alert type='danger'>{recipesError}</Alert>
						) : recipes.length === 0 ? (
							<div className='no-results'>
								<img
									alt='No recipes found'
									src='/images/sorry.png'
									alt='No recipes found'
								/>
								<p className='lead my-1 text-center'>
									Sorry, we could'nt find any recipes
								</p>
							</div>
						) : (
							<div className='recipes'>
								<div>
									{recipes.map((recipe) => (
										<Recipe recipe={recipe} key={recipe._id} />
									))}
								</div>
							</div>
						)}
					</div>
					<Paginate
						pages={pages}
						page={page}
						term={activeTerm}
						rating={activeRating}
						cuisine={activeCuisine}
					/>
				</div>
			</div>
		</>
	)
}

export default SearchPage
