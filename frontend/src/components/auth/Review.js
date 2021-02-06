import { Link } from 'react-router-dom'
import moment from 'moment'
import Rating from '../recipes/Rating'
const Review = ({ review }) => {
	return (
		<div className='review'>
			<Link to={`/recipe/${review.recipe._id}`}>
				<div className='review__header'>
					<img src={review.recipe.images[0]} alt={review.recipe.name} />
					<p>
						<strong>{review.recipe.name}</strong>
					</p>
				</div>
			</Link>
			<div className='review__body'>
				<Rating value={review.rating} />
				{moment(review.createdAt).fromNow()}
				<p>{review.title}</p>
				<p>{review.text} </p>
			</div>
		</div>
	)
}

export default Review
