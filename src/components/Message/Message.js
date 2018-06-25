import React from "react";

const Message = props => (

	<div className=" col-8">
	  <div className="card border-danger text-center mr-3">
	    <div className="card-body">
	      <h5 className="card-title">{props.message}</h5>                
	    </div>
	  </div>
	</div>
);

export default Message;