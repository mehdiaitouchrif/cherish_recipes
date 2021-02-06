import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { signup } from '../../actions/authActions'
import Loader from '../complements/Loader'
import Alert from '../complements/Alert'

const Signup = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userSignup = useSelector((state) => state.userSignup)
	const { error, loading } = userSignup

	// Redirect
	const location = useLocation()
	const redirect = location.search ? location.search.split('=')[1] : '/'

	const dispatch = useDispatch()
	const signupHandler = (e) => {
		e.preventDefault()

		dispatch(signup(firstName, lastName, email, password))
	}

	// check for userinfo & redirect
	const history = useHistory()
	useEffect(() => {
		if (userInfo) {
			if (redirect) {
				history.push(redirect)
			} else {
				history.push(`/`)
			}
		}
	}, [history, userInfo])

	return (
		<form onSubmit={signupHandler}>
			<input
				type='text'
				className='input'
				placeholder='First name'
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
			/>
			<input
				type='text'
				className='input'
				placeholder='Last name'
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
			/>
			<input
				type='text'
				className='input'
				placeholder='Enter email...'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				className='input'
				placeholder='Enter password...'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{loading && (
				<div className='text-center'>
					<Loader />
				</div>
			)}
			{error && <Alert type='danger'>{error}</Alert>}
			<button type='submit' className='btn btn-lg btn-primary rounded'>
				Sign up
			</button>
			<div>
				<Link to='/login'>
					Already have an account? <strong className='primary'>Login</strong>
				</Link>
			</div>
		</form>
	)
}

export default Signup
