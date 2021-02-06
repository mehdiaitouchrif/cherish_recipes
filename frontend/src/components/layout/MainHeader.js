import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, getUserDetails } from '../../actions/authActions'
import Loader from '../complements/Loader'

const MainHeader = () => {
	// Bring in user info
	const userDetails = useSelector((state) => state.userDetails)
	const { loading, user } = userDetails

	///// Comback for this to update component when update is trigirred
	const detailsUpdate = useSelector((state) => state.detailsUpdate)
	const { success } = detailsUpdate
	////

	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logout())
	}

	useEffect(() => {
		if (!user) {
			dispatch(getUserDetails())
		}
	}, [dispatch])

	return (
		<>
			<header className='main-header'>
				<div className='container'>
					<nav className='header__nav'>
						<a href='/'>
							<h3 className='header__logo logo'>
								Cherish <span className='header__logo--colored'>Recipes</span>
								{'>'}{' '}
							</h3>
						</a>
						<ul>
							{loading ? (
								<Loader type='medium' />
							) : user ? (
								<div className='user-logged '>
									<Link
										className='user-logged__outer user-logged__outer--main'
										to={`/profile/${user._id}`}
									>
										<img
											alt={user.firstName}
											src={user.photo}
											alt={user.firstName}
										/>
										<p>
											{user.firstName} {user.lastName}{' '}
										</p>
									</Link>
									<button
										className='btn btn-lg btn-primary rounded'
										onClick={handleLogout}
									>
										Logout
									</button>
								</div>
							) : (
								<>
									<Link to='/login'>
										<li className='btn btn-primary rounded' id='login'>
											Login
										</li>
									</Link>
									<Link to='/signup'>
										<li className='btn btn-primary rounded' id='signup'>
											Sign up
										</li>
									</Link>
								</>
							)}
						</ul>
					</nav>
				</div>
			</header>
		</>
	)
}

export default MainHeader
