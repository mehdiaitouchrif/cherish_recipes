import {
	RECIPE_LIST_FAIL,
	RECIPE_LIST_SUCCESS,
	RECIPE_LIST_REQUEST,
	RECIPE_DETAILS_REQUEST,
	RECIPE_DETAILS_FAIL,
	RECIPE_DETAILS_SUCCESS,
	USER_RECIPES_REQUEST,
	USER_RECIPES_SUCCESS,
	USER_RECIPES_FAIL,
	RECIPE_CREATE_REQUEST,
	RECIPE_CREATE_SUCCESS,
	RECIPE_CREATE_FAIL,
	RECIPE_DELETE_REQUEST,
	RECIPE_DELETE_SUCCESS,
	RECIPE_DELETE_FAIL,
	RECIPE_UPDATE_REQUEST,
	RECIPE_UPDATE_SUCCESS,
	RECIPE_UPDATE_FAIL,
	RECIPE_FILTERED_REQUEST,
	RECIPE_FILTRED_SUCCESS,
	RECIPE_FILTRED_FAIL,
	ADD_TO_VIEWED,
	GET_SIGNED_S3_URL_SUCCESS,
	GET_SIGNED_S3_URL_REQUEST,
	GET_SIGNED_S3_URL_FAIL,
} from '../constants/recipeConstants'
import axios from 'axios'

export const listRecipes = () => async (dispatch) => {
	try {
		dispatch({ type: RECIPE_LIST_REQUEST })

		const { data } = await axios.get(`/api/v1/recipes`)

		dispatch({
			type: RECIPE_LIST_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: RECIPE_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listFiltredRecipes = (
	term = '',
	rating = 4.5,
	page = '',
	cuisine = '',
	sort = 'name'
) => async (dispatch) => {
	try {
		dispatch({ type: RECIPE_FILTERED_REQUEST })

		const { data } = await axios.get(
			`/api/v1/recipes?search=${term}&averageRating[gte]=${rating}&page=${page}&sort=${sort}&cuisine=${cuisine}`
		)

		dispatch({
			type: RECIPE_FILTRED_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: RECIPE_FILTRED_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listRecipeDetails = (id) => async (dispatch) => {
	try {
		dispatch({
			type: RECIPE_DETAILS_REQUEST,
		})

		const { data } = await axios.get(`/api/v1/recipes/${id}`)

		dispatch({
			type: RECIPE_DETAILS_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: RECIPE_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listUserRecipes = (userId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_RECIPES_REQUEST,
		})

		const { data } = await axios.get(`/api/v1/auth/${userId}/recipes`)

		dispatch({
			type: USER_RECIPES_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: USER_RECIPES_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const createRecipe = (recipe) => async (dispatch, getState) => {
	try {
		dispatch({
			type: RECIPE_CREATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.post(`/api/v1/recipes`, recipe, config)

		dispatch({
			type: RECIPE_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: RECIPE_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateRecipe = (recipeId, recipe) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: RECIPE_UPDATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.put(
			`/api/v1/recipes/${recipeId}`,
			recipe,
			config
		)

		dispatch({
			type: RECIPE_UPDATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: RECIPE_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const deleteRecipe = (recipeId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: RECIPE_DELETE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.delete(`/api/v1/recipes/${recipeId}`, config)

		dispatch({
			type: RECIPE_DELETE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: RECIPE_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const addToViewed = (id) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/v1/recipes/${id}`)

	dispatch({
		type: ADD_TO_VIEWED,
		payload: data.data,
	})

	localStorage.setItem(
		'recentlyViewed',
		JSON.stringify(getState().recentlyViewed.recentlyViewed)
	)
}
