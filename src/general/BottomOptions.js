import React from 'react';

import './BottomOptions.scss';

function BottomOptions(props) {
  return (
    <div className="BottomOptions">
      <div className="FixedMargin" />
      <div className="MidFlexWidth">
        {props.children}
      </div>
      <div className="FixedMargin" />
    </div>
  );
}

export default BottomOptions;