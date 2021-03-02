import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { login, forgotPassword, resetPassword } from '../../actions/authActions'
import Loader from '../complements/Loader'
import Alert from '../complements/Alert'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const location = useLocation()
	const redirect = location.search ? location.search.split('=')[1] : '/'

	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { error, loading, userInfo } = userLogin

	const loginHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

	// Forgot password
	const [isForgotClicked, setIsForgotClicked] = useState(false)

	const passwordForgot = useSelector((state) => state.passwordForgot)
	const {
		error: forgotError,
		loading: forgotLoading,
		success: forgotSuccess,
	} = passwordForgot

	const handleForgotPass = (e) => {
		e.preventDefault()
		dispatch(forgotPassword(email))
	}

	// Password reset
	const [resetToken, setResetToken] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errMsg, setErrMsg] = useState(false)
	const passwordReset = useSelector((state) => state.passwordReset)
	const {
		error: resetError,
		loading: resetLoading,
		success: resetSuccess,
	} = passwordReset

	const handlePasswordReset = (e) => {
		e.preventDefault()

		if (confirmPassword !== newPassword) {
			setErrMsg(true)
		} else {
			if (resetToken !== '') {
				setErrMsg(false)
				dispatch(resetPassword(newPassword, resetToken))
			}
		}
	}

	// check for userinfo & redirect
	const history = useHistory()
	useEffect(() => {
		if (userInfo) {
			if (!redirect) {
				history.push(`/profile/${userInfo.user._id}`)
			} else {
				history.push(`${redirect}`)
			}
		}
	}, [history, userInfo])

	return (
		<>
			{isForgotClicked && !forgotSuccess ? (
				<form onSubmit={handleForgotPass}>
					<h2 className='primary my-half'>Forgot password</h2>
					<input
						type='text'
						placeholder='Enter your email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{forgotLoading && <Loader />}
					{forgotError && <Alert type='danger'>{forgotError} </Alert>}

					<div>
						<button className='btn btn-lg btn-primary rounded'>Submit</button>
					</div>
					<p
						onClick={() => setIsForgotClicked(false)}
						className='btn btn-lg btn-info'
					>
						Back to Login
					</p>
				</form>
			) : forgotSuccess ? (
				<>
					<div className='my-1'>
						<Alert type='success'>
							An email with a reset code has been sent. Check your email!
						</Alert>
					</div>
					<form onSubmit={handlePasswordReset}>
						<input
							type='text'
							placeholder='Enter reset code'
							value={resetToken}
							onChange={(e) => setResetToken(e.target.value)}
						/>
						<input
							type='password'
							placeholder='New password'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
						<input
							type='password'
							placeholder='Confirm new password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						{errMsg && (
							<Alert type='danger'>Please enter matching passwords </Alert>
						)}
						{resetLoading && <Loader />}
						{resetError && <Alert type='danger'> {resetError}</Alert>}
						{resetSuccess && <Alert type='success'>Password Changed </Alert>}
						<button className='btn btn-lg btn-primary rounded'>Submit</button>
					</form>
					<button
						onClick={() => window.location.reload()}
						className='btn btn-lg btn-info'
					>
						Back to Login
					</button>
				</>
			) : (
				<form onSubmit={loginHandler}>
					<h2 className='primary my-half'>Login</h2>

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
						Login
					</button>
					<div>
						<Link to='/signup'>
							New to CherishRecipes?{' '}
							<strong className='primary'>Create account</strong>
						</Link>
					</div>
				</form>
			)}
			{!isForgotClicked && !forgotSuccess && (
				<button
					onClick={() => setIsForgotClicked(true)}
					className='btn btn-danger rounded'
				>
					Forgot password?
				</button>
			)}
		</>
	)
}

export default Login
