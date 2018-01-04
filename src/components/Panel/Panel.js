import React from "react";

const Panel = props => (
	<div className="col-3 text-center panel" key={props.id} onClick={() => props.guess(props.id, props.clicked)}>
		<img src={props.url} alt={props.name} />
	</div>
);

export default Panel;