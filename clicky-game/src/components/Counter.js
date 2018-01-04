import React from "react";

// By extending the React.Component class, Counter inherits functionality from it
const Counter = props => (

  // The render method returns the JSX that should be rendered

      <div className="card text-white bg-danger col-3">
        <div className="card-body h3">Score: {props.count}/12</div>
      </div>

);

export default Counter;