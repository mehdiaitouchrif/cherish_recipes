const Alert = (props) => (
	<div className={`alert alert-${props.type}`}>{props.children}</div>
)

export default Alert
