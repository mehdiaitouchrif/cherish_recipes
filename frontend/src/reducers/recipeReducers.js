import {
	ADD_TO_VIEWED,
	RECIPE_CREATE_FAIL,
	RECIPE_CREATE_REQUEST,
	RECIPE_CREATE_SUCCESS,
	RECIPE_DELETE_FAIL,
	RECIPE_DELETE_REQUEST,
	RECIPE_DELETE_SUCCESS,
	RECIPE_DETAILS_FAIL,
	RECIPE_DETAILS_REQUEST,
	RECIPE_DETAILS_SUCCESS,
	RECIPE_FILTERED_REQUEST,
	RECIPE_FILTRED_FAIL,
	RECIPE_FILTRED_SUCCESS,
	RECIPE_LIST_FAIL,
	RECIPE_LIST_REQUEST,
	RECIPE_LIST_SUCCESS,
	RECIPE_UPDATE_FAIL,
	RECIPE_UPDATE_REQUEST,
	RECIPE_UPDATE_RESET,
	RECIPE_UPDATE_SUCCESS,
	USER_RECIPES_FAIL,
	USER_RECIPES_REQUEST,
	USER_RECIPES_SUCCESS,
} from '../constants/recipeConstants'

export const recipeListReducer = (state = { recipes: [] }, action) => {
	switch (action.type) {
		case RECIPE_LIST_REQUEST:
			return { loading: true, recipes: [] }
		case RECIPE_LIST_SUCCESS:
			return {
				loading: false,
				recipes: action.payload,
			}
		case RECIPE_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const recipeFiltredReducer = (state = { recipes: [] }, action) => {
	switch (action.type) {
		case RECIPE_FILTERED_REQUEST:
			return { loading: true, recipes: [] }
		case RECIPE_FILTRED_SUCCESS:
			return {
				loading: false,
				recipes: action.payload.data,
				pages: action.payload.pagination.pages,
				page: action.payload.pagination.page,
				nextPage: action.payload.pagination.nextPage,
				previousPage: action.payload.pagination.previousPage,
			}
		case RECIPE_FILTRED_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const recipeDetailsReducer = (
	state = { recipe: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case RECIPE_DETAILS_REQUEST:
			return {
				loading: true,
				recipe: {},
			}
		case RECIPE_DETAILS_SUCCESS:
			return {
				loading: false,
				recipe: action.payload,
			}
		case RECIPE_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const userRecipesReducer = (state = { recipes: [] }, action) => {
	switch (action.type) {
		case USER_RECIPES_REQUEST:
			return {
				loading: true,
				recipes: [],
			}
		case USER_RECIPES_SUCCESS:
			return {
				loading: false,
				recipes: action.payload,
			}
		case USER_RECIPES_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const recipeCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case RECIPE_CREATE_REQUEST:
			return {
				loading: true,
			}
		case RECIPE_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case RECIPE_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const recipeUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case RECIPE_UPDATE_REQUEST:
			return {
				loading: true,
			}
		case RECIPE_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case RECIPE_UPDATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case RECIPE_UPDATE_RESET:
			return {}
		default:
			return state
	}
}

export const recipeDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case RECIPE_DELETE_REQUEST:
			return {
				loading: true,
			}
		case RECIPE_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case RECIPE_DELETE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const recentlyViewedReducer = (
	state = { recentlyViewed: [] },
	action
) => {
	switch (action.type) {
		case ADD_TO_VIEWED:
			const recipe = action.payload

			const existingRecipe = state.recentlyViewed.find(
				(i) => i._id === recipe._id
			)

			if (existingRecipe) {
				return {
					...state,
					recentlyViewed: state.recentlyViewed.map((i) =>
						i._id === existingRecipe._id ? recipe : i
					),
				}
			} else {
				return {
					...state,
					recentlyViewed: [...state.recentlyViewed, recipe],
				}
			}
		default:
			return state
	}
}
