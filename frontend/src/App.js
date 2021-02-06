import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import ProfilePage from './pages/ProfilePage'
import Footer from './components/layout/Footer'
import EditRecipePage from './pages/EditRecipePage'
import SearchPage from './pages/SearchPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ConfirmEmail from './pages/ConfirmEmail'

const App = () => (
	<Router>
		<Route exact path='/' component={HomePage} />
		<Route path='/login' component={LoginPage} />
		<Route path='/signup' component={SignupPage} />
		<Route exact path='/recipe/:id' component={RecipePage} />
		<Route path='/recipe/:recipeId/edit' component={EditRecipePage} />
		<Route
			path='/search/:term?/:cuisine?/:rating?/:page?'
			component={SearchPage}
		/>
		<Route path='/profile/:username/:recipeId?' component={ProfilePage} />
		<Route path='/confirmemail/:token' component={ConfirmEmail} />
		<Footer />
	</Router>
)

export default App
