import Login from '../components/auth/Login'
import MainHeader from '../components/layout/MainHeader'

const LoginPage = ({ history }) => {
	return (
		<>
			<MainHeader />
			<div className='container'>
				<div className='auth'>
					<Login />
				</div>
			</div>
		</>
	)
}

export default LoginPage
