import {
	REVIEW_LIST_REQUEST,
	REVIEW_LIST_SUCCESS,
	REVIEW_LIST_FAIL,
	LIST_USER_REVIEWS_REQUEST,
	LIST_USER_REVIEWS_SUCCESS,
	LIST_USER_REVIEWS_FAIL,
	REVIEW_CREATE_REQUEST,
	REVIEW_CREATE_SUCCESS,
	REVIEW_CREATE_FAIL,
	REVIEW_UPDATE_REQUEST,
	REVIEW_UPDATE_SUCCESS,
	REVIEW_UPDATE_FAIL,
	REVIEW_DELETE_RESET,
	REVIEW_UPDATE_RESET,
	REVIEW_CREATE_RESET,
	REVIEW_DELETE_REQUEST,
	REVIEW_DELETE_SUCCESS,
	REVIEW_DELETE_FAIL,
	RECIPE_REVIEWS_REQUEST,
	RECIPE_REVIEWS_SUCCESS,
	RECIPE_REVIEWS_FAIL,
	SINGLE_REVIEW_REQUEST,
	SINGLE_REVIEW_SUCCESS,
	SINGLE_REVIEW_FAIL,
} from '../constants/reviewConstants'

export const reviewListReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case REVIEW_LIST_REQUEST:
			return { loading: true, reviews: [] }
		case REVIEW_LIST_SUCCESS:
			return {
				loading: false,
				reviews: action.payload,
			}
		case REVIEW_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const singleReviewReducer = (state = { review: {} }, action) => {
	switch (action.type) {
		case SINGLE_REVIEW_REQUEST:
			return { loading: true, review: {} }
		case SINGLE_REVIEW_SUCCESS:
			return {
				loading: false,
				review: action.payload,
			}
		case SINGLE_REVIEW_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const userReviewsReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case LIST_USER_REVIEWS_REQUEST:
			return { loading: true, reviews: [] }
		case LIST_USER_REVIEWS_SUCCESS:
			return {
				loading: false,
				reviews: action.payload,
			}
		case LIST_USER_REVIEWS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const recipeReviewsReducer = (state = { reviews: [] }, action) => {
	switch (action.type) {
		case RECIPE_REVIEWS_REQUEST:
			return { loading: true, reviews: [] }
		case RECIPE_REVIEWS_SUCCESS:
			return {
				loading: false,
				reviews: action.payload,
			}
		case RECIPE_REVIEWS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const reviewCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case REVIEW_CREATE_REQUEST:
			return { loading: true }
		case REVIEW_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case REVIEW_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case REVIEW_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const reviewUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case REVIEW_UPDATE_REQUEST:
			return { loading: true }
		case REVIEW_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case REVIEW_UPDATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case REVIEW_UPDATE_RESET:
			return {}
		default:
			return state
	}
}

export const reviewDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case REVIEW_DELETE_REQUEST:
			return { loading: true }
		case REVIEW_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case REVIEW_DELETE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case REVIEW_DELETE_RESET:
			return {}
		default:
			return state
	}
}
