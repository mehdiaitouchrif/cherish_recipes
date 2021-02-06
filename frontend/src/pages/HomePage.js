import Meta from '../components/complements/Meta'
import Container from '../components/layout/Container'
import HomeHeader from '../components/layout/HomeHeader'
import Cuisines from '../components/redirects/Cuisines'
import Groups from '../components/redirects/Groups'
import Recipes from '../components/recipes/Recipes'

const Home = () => {
	return (
		<>
			<Meta />
			<HomeHeader />
			<Container>
				<Cuisines />
				<Groups />
				<Recipes />
			</Container>
		</>
	)
}

export default Home
