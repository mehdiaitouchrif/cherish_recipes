import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { confirmUserEmail } from '../actions/authActions'
import Alert from '../components/complements/Alert'
import Loader from '../components/complements/Loader'
import MainHeader from '../components/layout/MainHeader'

const ConfirmEmail = ({ match, history }) => {
	const confirmationToken = match.params.token

	// Get confirmation state
	const userConfirmEmail = useSelector((state) => state.userConfirmEmail)
	const { loading, error, success } = userConfirmEmail

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(confirmUserEmail(confirmationToken))

		if (success) {
			history.push('/')
		}
	}, [dispatch, success])

	return (
		<>
			<MainHeader />
			<div className='container text-center'>
				{loading && <Loader />} {error && <Alert type='danger'>{error} </Alert>}{' '}
			</div>
		</>
	)
}

export default ConfirmEmail
