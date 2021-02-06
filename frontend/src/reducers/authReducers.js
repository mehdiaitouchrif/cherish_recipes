import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	LOGOUT,
	UPDATE_DETAILS_REQUEST,
	UPDATE_DETAILS_SUCCESS,
	UPDATE_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_FAIL,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_RESET,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_FAIL,
	EMAIL_CONFIRMATION_REQUEST,
	EMAIL_CONFIRMATION_SUCCESS,
	EMAIL_CONFIRMATION_FAIL,
	USER_CONFIRM_EMAIL_REQUEST,
	USER_CONFIRM_EMAIL_SUCCESS,
	USER_CONFIRM_EMAIL_FAIL,
	ACCOUNT_DELETE_REQUEST,
	ACCOUNT_DELETE_SUCCESS,
	ACCOUNT_DELETE_FAIL,
} from '../constants/authConstants'

export const loginReducer = (state = { userInfo: {} }, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				loading: true,
			}
		case LOGIN_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			}
		case LOGIN_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case LOGOUT:
			return {}
		default:
			return state
	}
}

export const signupReducer = (state = {}, action) => {
	switch (action.type) {
		case SIGNUP_REQUEST:
			return {
				loading: true,
			}
		case SIGNUP_SUCCESS:
			return {
				loading: false,
				userInfo: action.payload,
			}
		case SIGNUP_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const userDetailsReducer = (state = { user: null }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return {
				loading: true,
			}
		case USER_DETAILS_SUCCESS:
			return {
				loading: false,
				user: action.payload,
			}
		case USER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
export const detailsUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_DETAILS_REQUEST:
			return {
				loading: true,
			}
		case UPDATE_DETAILS_SUCCESS:
			return {
				loading: false,
				success: true,
				userInfo: action.payload,
			}
		case UPDATE_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const passwordUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_PASSWORD_REQUEST:
			return {
				loading: true,
			}
		case UPDATE_PASSWORD_SUCCESS:
			return {
				loading: false,
				success: true,
				userInfo: action.payload,
			}
		case UPDATE_PASSWORD_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case UPDATE_PASSWORD_RESET:
			return {}
		default:
			return state
	}
}

export const passwordForgotReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
			return {
				loading: true,
			}
		case FORGOT_PASSWORD_SUCCESS:
			return { loading: false, success: true }
		case FORGOT_PASSWORD_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const passwordResetReducer = (state = {}, action) => {
	switch (action.type) {
		case RESET_PASSWORD_REQUEST:
			return {
				loading: true,
			}
		case RESET_PASSWORD_SUCCESS:
			return { loading: false, success: true }
		case RESET_PASSWORD_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const emailConfirmationReducer = (state = {}, action) => {
	switch (action.type) {
		case EMAIL_CONFIRMATION_REQUEST:
			return { loading: true }
		case EMAIL_CONFIRMATION_SUCCESS:
			return { loading: false, success: true }
		case EMAIL_CONFIRMATION_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const userConfirmEmailReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_CONFIRM_EMAIL_REQUEST:
			return {
				loading: true,
			}
		case USER_CONFIRM_EMAIL_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case USER_CONFIRM_EMAIL_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const accountDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ACCOUNT_DELETE_REQUEST:
			return {
				loading: true,
			}
		case ACCOUNT_DELETE_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case ACCOUNT_DELETE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}
