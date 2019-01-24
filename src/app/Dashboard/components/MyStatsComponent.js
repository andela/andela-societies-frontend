import React from 'react';
import PropTypes from 'prop-types';

const MyStatsComponent = (props) => {
  const { points, activities } = props;
  return (
    <div className='stats'>
      <div className='stats__points'>
        <h3 className='stats__description'>My Total Points Earned</h3>
        <h3 className='stats__description__figure'>
          {points}
          <span className='stats__description--footer--subsc'>Points</span>
        </h3>
      </div>
      <div className='stats__activities'>
        <h3 className='stats__description'>My Activities Logged</h3>
        <h3 className='stats__description__figure'>
          {activities}
          <span className='stats__description__figure--subsc'>Activities</span>
        </h3>
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
