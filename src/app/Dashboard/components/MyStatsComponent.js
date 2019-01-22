import React from 'react';
import PropTypes from 'prop-types';

const MyStatsComponent = (props) => {
  const { points, activities } = props;
  return (
    <div className=''>
      <div>
        <h3>My Total Points Earned</h3>
        <h3>{points}</h3>
        <h6>points</h6>
      </div>
      <div>
        <h3>My Activities Logged</h3>
        <h3>{activities}</h3>
        <h6>Activities</h6>
      </div>
    </div>
  );
};

MyStatsComponent.defaultProps = {
  points: 0,
  activities: 0,
};


MyStatsComponent.propTypes = {
  points: PropTypes.number,
  activities: PropTypes.number,
};

export default MyStatsComponent;
