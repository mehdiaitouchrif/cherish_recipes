import {
	GET_SIGNED_URL_FAIL,
	GET_SIGNED_URL_REQUEST,
	GET_SIGNED_URL_SUCCESS,
	UPLOAD_FILE_FAIL,
	UPLOAD_FILE_SUCCESS,
} from '../constants/uploadConstants'
import axios from 'axios'

export const getSignedRequest = (file, resource) => async (dispatch) => {
	try {
		dispatch({ type: GET_SIGNED_URL_REQUEST })
		const response = await axios.get(
			`/api/v1/upload/sign-s3?file-name=${file.name}&file-type=${file.type}`
		)
		uploadFile(
			file,
			response.data.signedRequest,
			response.data.url,
			dispatch,
			resource
		)

		dispatch({
			type: GET_SIGNED_URL_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: GET_SIGNED_URL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

function uploadFile(file, signedRequest, url, dispatch, resource) {
	const xhr = new XMLHttpRequest()
	xhr.open('PUT', signedRequest)
	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				dispatch({
					type: UPLOAD_FILE_SUCCESS,
					payload: { url, resource },
				})
			} else {
				dispatch({ type: UPLOAD_FILE_FAIL })
			}
		}
	}
	xhr.send(file)
}
