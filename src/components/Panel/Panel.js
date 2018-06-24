import React from "react";

const Panel = props => (

	<div className="col-4 col-md-3 panel" key={props.id} onClick={() => props.guess(props.id, props.clicked)}>
		<img src={props.url} alt={props.name} />
	</div>

);

export default Panel;