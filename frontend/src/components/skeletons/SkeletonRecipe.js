import Shimmer from './Shimmer'
import Skeleton from './Skeleton'

const SkeletonRecipe = () => {
	return (
		<div className='skeleton-wrapper'>
			<div className='skeleton-recipe'>
				<Skeleton type='image' />
				<Skeleton type='title' />
				<Skeleton type='text' />
				<div className='d-flex flex-align'>
					<Skeleton type='avatar' />
					<Skeleton type='name' />
				</div>
			</div>
			<Shimmer />
		</div>
	)
}

export default SkeletonRecipe
