import { Link } from 'react-router-dom'
const Groups = () => {
	const groups = [
		{
			name: 'Dairy',
			img: '/images/groups/dairy.jpg',
		},
		{
			name: 'Fruits',
			img: '/images/groups/fruits.jpg',
		},
		{
			name: 'Protein foods',
			img: '/images/groups/protein.jpg',
		},
		{
			name: 'Vegetables',
			img: '/images/groups/vegetables.jpg',
		},
		{
			name: 'Grains',
			img: '/images/groups/grains.jpg',
		},
	]
	return (
		<section className='groups' id='groups'>
			<div className='mb-2 mt-2'>
				{groups.map((group) => (
					<div key={group + Math.random()} className='group'>
						<img src={group.img} alt={group.name} />
						<p>{group.name}</p>
					</div>
				))}
			</div>
			<h2 className='primary-heading mt-2'>Find your favorite food groups</h2>
		</section>
	)
}

export default Groups
