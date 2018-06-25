import React from "react";
import "./Panel.css";

const Panel = props => (
	
	<div className="col-4 col-md-3 panel mx-auto" key={props.id} onClick={() => props.guess(props.id, props.clicked)}>
		<img src={props.url} alt={props.name} />
	</div>

);

export default Panel;