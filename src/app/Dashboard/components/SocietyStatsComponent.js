import React from 'react';
import PropTypes from 'prop-types';

const SocietyStatsComponent = (props) => {
  const { usedPoints, remainingPoints } = props;
  return (
    <div>
      <hr />
      <div>
        <div>
          <span />
          <h2> Used points</h2>
        </div>
        <div>
          <span />
          <h2> Total Remaining Points</h2>
        </div>
      </div>
      <div>
        <h3>
          {usedPoints}
          <span>points</span>
        </h3>
        <h3>
          {remainingPoints}
          <span>points</span>
        </h3>
        <h3>
          Istelle
        </h3>
      </div>
    </div>
  );
};


SocietyStatsComponent.defaultProps = {
  usedPoints: 0,
  remainingPoints: 0,
};

SocietyStatsComponent.propTypes = {
  usedPoints: PropTypes.number,
  remainingPoints: PropTypes.number,
};


export default SocietyStatsComponent;
