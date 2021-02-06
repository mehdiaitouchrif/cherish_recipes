const Badge = (props) => {
	return <div className={`badge badge-${props.type}`}>{props.children}</div>
}

export default Badge
