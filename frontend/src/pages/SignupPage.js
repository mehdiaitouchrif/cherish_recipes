import Signup from '../components/auth/Signup'
import MainHeader from '../components/layout/MainHeader'

const SignupPage = () => {
	return (
		<>
			<MainHeader />
			<div className='container'>
				<div className='auth'>
					<h2 className='primary my-half'>Sign up</h2>
					<Signup />
				</div>
			</div>
		</>
	)
}

export default SignupPage
