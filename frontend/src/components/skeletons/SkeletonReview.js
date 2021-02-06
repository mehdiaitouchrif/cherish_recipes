import Shimmer from './Shimmer'
import Skeleton from './Skeleton'

const SkeletonReview = () => {
	return (
		<div className='skeleton-wrapper'>
			<div className='skeleton-review'>
				<div className='d-flex flex-align'>
					<Skeleton type='avatar' />
					<Skeleton type='title' />
					<Skeleton type='title' />
				</div>
				<Skeleton type='text' />
				<Skeleton type='text' />
			</div>
			<Shimmer />
		</div>
	)
}

export default SkeletonReview
