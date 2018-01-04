import React from "react";

// By extending the React.Component class, Counter inherits functionality from it
const Counter = props => (

  // The render method returns the JSX that should be rendered

      <div className="panel panel-primary">
        <div className="panel-heading">Click Counter!</div>
        <div className="panel-body text-center">
          <p>Click Count: {props.count}</p>
        </div>
      </div>

);

export default Counter;