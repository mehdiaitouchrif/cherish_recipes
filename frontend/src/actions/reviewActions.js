import {
	LIST_USER_REVIEWS_FAIL,
	LIST_USER_REVIEWS_REQUEST,
	LIST_USER_REVIEWS_SUCCESS,
	RECIPE_REVIEWS_FAIL,
	RECIPE_REVIEWS_REQUEST,
	RECIPE_REVIEWS_SUCCESS,
	REVIEW_CREATE_FAIL,
	REVIEW_CREATE_REQUEST,
	REVIEW_CREATE_SUCCESS,
	REVIEW_DELETE_FAIL,
	REVIEW_DELETE_REQUEST,
	REVIEW_DELETE_SUCCESS,
	REVIEW_LIST_FAIL,
	REVIEW_LIST_REQUEST,
	REVIEW_LIST_SUCCESS,
	REVIEW_UPDATE_FAIL,
	REVIEW_UPDATE_REQUEST,
	REVIEW_UPDATE_SUCCESS,
	SINGLE_REVIEW_FAIL,
	SINGLE_REVIEW_REQUEST,
	SINGLE_REVIEW_SUCCESS,
} from '../constants/reviewConstants'
import axios from 'axios'

export const listReviews = () => async (dispatch) => {
	try {
		dispatch({ type: REVIEW_LIST_REQUEST })

		const { data } = await axios.get('/api/v1/reviews')

		dispatch({
			type: REVIEW_LIST_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: REVIEW_LIST_FAIL,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getSingleReview = (reviewId) => async (dispatch) => {
	try {
		dispatch({ type: SINGLE_REVIEW_REQUEST })

		const { data } = await axios.get(`/api/v1/reviews/${reviewId}`)

		dispatch({
			type: SINGLE_REVIEW_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: SINGLE_REVIEW_FAIL,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listUserReviews = (userId) => async (dispatch, getState) => {
	try {
		dispatch({ type: LIST_USER_REVIEWS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.get(`/api/v1/auth/${userId}/reviews`, config)

		dispatch({
			type: LIST_USER_REVIEWS_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: LIST_USER_REVIEWS_FAIL,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const listRecipeReviews = (recipeId) => async (dispatch, getState) => {
	try {
		dispatch({ type: RECIPE_REVIEWS_REQUEST })

		const { data } = await axios.get(`/api/v1/recipes/${recipeId}/reviews`)

		dispatch({
			type: RECIPE_REVIEWS_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: RECIPE_REVIEWS_FAIL,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const createReview = (recipeId, review) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: REVIEW_CREATE_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.post(
			`/api/v1/recipes/${recipeId}/reviews`,
			review,
			config
		)

		dispatch({
			type: REVIEW_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: REVIEW_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateReview = (reviewId, review) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: REVIEW_UPDATE_REQUEST })

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
			`/api/v1/reviews/${reviewId}`,
			review,
			config
		)

		dispatch({
			type: REVIEW_UPDATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: REVIEW_UPDATE_FAIL,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const deleteReview = (reviewId) => async (dispatch, getState) => {
	try {
		dispatch({ type: REVIEW_DELETE_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.delete(`/api/v1/reviews/${reviewId}`, config)

		dispatch({
			type: REVIEW_DELETE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: REVIEW_DELETE_FAIL,
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
