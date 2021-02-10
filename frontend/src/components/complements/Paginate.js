import { Link } from 'react-router-dom'

// Add cuisine, rating, & group later
const Paginate = ({ pages, page, term = ' ' }) => {
	return (
		pages > 1 && (
			<div className='paginate'>
				{[...Array(pages).keys()].map((key) => (
					<Link key={key} to={`/search/${term}/${key + 1}`}>
						<button className={`btn ${key + 1 === page && 'btn-primary'}`}>
							{key + 1}
						</button>
					</Link>
				))}
			</div>
		)
	)
}

export default Paginate
