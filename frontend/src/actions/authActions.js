import axios from 'axios'
import {
	ACCOUNT_DELETE_FAIL,
	ACCOUNT_DELETE_REQUEST,
	ACCOUNT_DELETE_SUCCESS,
	EMAIL_CONFIRMATION_FAIL,
	EMAIL_CONFIRMATION_REQUEST,
	EMAIL_CONFIRMATION_SUCCESS,
	FORGOT_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	SIGNUP_FAIL,
	SIGNUP_REQUEST,
	SIGNUP_SUCCESS,
	UPDATE_DETAILS_FAIL,
	UPDATE_DETAILS_REQUEST,
	UPDATE_DETAILS_SUCCESS,
	UPDATE_PASSWORD_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	USER_CONFIRM_EMAIL_FAIL,
	USER_CONFIRM_EMAIL_REQUEST,
	USER_CONFIRM_EMAIL_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
} from '../constants/authConstants'

export const login = (email, password) => async (dispatch, getState) => {
	try {
		dispatch({ type: LOGIN_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post(
			'/api/v1/auth/signin',
			{ email, password },
			config
		)
		dispatch({
			type: LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const signup = (firstName, lastName, email, password) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: SIGNUP_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post(
			'/api/v1/auth/signup',
			{ firstName, lastName, email, password },
			config
		)
		dispatch({
			type: SIGNUP_SUCCESS,
			payload: data,
		})

		dispatch({
			type: LOGIN_SUCCESS,
			payload: data,
		})

		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		dispatch({
			type: SIGNUP_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch({ type: LOGOUT })
	document.location.href = '/'
}

export const getUserDetails = () => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token} `,
			},
		}

		const { data } = await axios.get('/api/v1/auth/me', config)

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updateDetails = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: UPDATE_DETAILS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await axios.put(`/api/v1/auth/updatedetails`, user, config)
		dispatch({
			type: UPDATE_DETAILS_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: UPDATE_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const updatePassword = (currentPassword, newPassword) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: UPDATE_PASSWORD_REQUEST })

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
			`/api/v1/auth/updatepassword`,
			{ currentPassword, newPassword },
			config
		)
		dispatch({
			type: UPDATE_PASSWORD_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: UPDATE_PASSWORD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const data = await axios.post(
			'/api/v1/auth/forgotpassword',
			{ email },
			config
		)

		dispatch({
			type: FORGOT_PASSWORD_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: FORGOT_PASSWORD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const resetPassword = (newPassoword, token) => async (dispatch) => {
	try {
		dispatch({ type: RESET_PASSWORD_REQUEST })

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const data = await axios.put(
			`/api/v1/auth/resetpassword/${token}`,
			{ password: newPassoword },
			config
		)

		dispatch({
			type: RESET_PASSWORD_SUCCESS,
			payload: data.data,
		})
	} catch (error) {
		dispatch({
			type: RESET_PASSWORD_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const sendConfirmationEmail = () => async (dispatch, getState) => {
	try {
		dispatch({ type: EMAIL_CONFIRMATION_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		await axios.post('/api/v1/auth/sendconfirmationemail', null, config)

		dispatch({
			type: EMAIL_CONFIRMATION_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: EMAIL_CONFIRMATION_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const confirmUserEmail = (token) => async (dispatch) => {
	try {
		dispatch({
			type: USER_CONFIRM_EMAIL_REQUEST,
		})

		const { data } = await axios.put(`/api/v1/auth/confirmemail/${token}`)

		dispatch({
			type: USER_CONFIRM_EMAIL_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: USER_CONFIRM_EMAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const deleteUserAccount = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ACCOUNT_DELETE_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		await axios.delete('/api/v1/auth/deleteaccount', config)

		dispatch({
			type: ACCOUNT_DELETE_SUCCESS,
		})
		localStorage.removeItem('userInfo')
		dispatch({ type: LOGOUT })
	} catch (error) {
		dispatch({
			type: ACCOUNT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
