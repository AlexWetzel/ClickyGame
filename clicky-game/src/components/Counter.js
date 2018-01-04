import React from "react";

const Counter = props => (

  <div className="card text-white bg-danger col-3">
    <div className="card-body h3">Score: {props.count}/12</div>
  </div>

);

export default Counter;