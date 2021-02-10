import {
	GET_SIGNED_URL_FAIL,
	GET_SIGNED_URL_REQUEST,
	GET_SIGNED_URL_SUCCESS,
	UPLOAD_FILE_FAIL,
	UPLOAD_FILE_SUCCESS,
} from '../constants/uploadConstants'

export const signedRequestReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_SIGNED_URL_REQUEST:
			return {
				loading: true,
			}
		case GET_SIGNED_URL_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case GET_SIGNED_URL_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const fileUploadReducer = (state = {}, action) => {
	switch (action.type) {
		case UPLOAD_FILE_SUCCESS:
			return {
				loading: false,
				resource: action.payload.resource,
				data: action.payload.url,
			}
		case UPLOAD_FILE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}

		default:
			return state
	}
}
