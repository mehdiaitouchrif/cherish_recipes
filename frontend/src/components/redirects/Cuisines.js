import { Link } from 'react-router-dom'

const Cuisines = () => {
	const cuisines = [
		{
			name: 'American',
			img: '/images/cuisines/american.webp',
		},
		{
			name: 'Moroccan',
			img: '/images/cuisines/moroccan.webp',
		},
		{
			name: 'Spanish',
			img: '/images/cuisines/spanish.webp',
		},
		{
			name: 'Chinese',
			img: '/images/cuisines/chinese.webp',
		},
		{
			name: 'French',
			img: '/images/cuisines/french.webp',
		},
		{
			name: 'Japanese',
			img: '/images/cuisines/japanese.webp',
		},
		{
			name: 'Indian',
			img: '/images/cuisines/indian.webp',
		},
		{
			name: 'Italian',
			img: '/images/cuisines/italian.webp',
		},
	]
	return (
		<section id='cuisines' className='cuisines'>
			<h2 className='primary-heading'>Go for your favorite cuisine</h2>
			<div className='mb-2'>
				{cuisines.map((cuisine) => (
					<div key={cuisine + Math.random()} className='cuisine'>
						<Link
							className='cuisine__container'
							to={`/search/ /${cuisine.name}/ /`}
						>
							<img
								className='cuisine__image'
								src={cuisine.img}
								alt={cuisine.name}
							/>
							<p className='cuisine__name'>{cuisine.name}</p>
						</Link>
					</div>
				))}
			</div>
		</section>
	)
}

export default Cuisines
