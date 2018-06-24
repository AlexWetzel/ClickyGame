import React from "react";

const Counter = props => (

  <div className="card text-white bg-danger col-3">
  	<div className="row card-body h3">
    	<div>Score:&nbsp;</div>
			<div>{props.count}/12</div>
    </div>
  </div>

);

export default Counter;