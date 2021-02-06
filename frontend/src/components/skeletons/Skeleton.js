const Skeleton = ({ type }) => {
	const classes = `skeleton skeleton-${type}`

	return <div className={classes}></div>
}

export default Skeleton
