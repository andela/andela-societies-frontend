import React from 'react';
import PropTypes from 'prop-types';

const MyStatsComponent = (props) => {
  const { points, activities } = props;
  return (
    <div className='stats'>
      <div className='stats__points'>
        <p className='stats__description'>My Total Points Earned</p>
        <p className='stats__description__figure my-stats'>
          {points}
          <span className='stats__description--footer--subsc'>Points</span>
        </p>
      </div>
      <div className='stats__activities'>
        <p className='stats__description'>My Activities Logged</p>
        <p className='stats__description__figure my-stats'>
          {activities}
          <span className='stats__description__figure--subsc'>Activities</span>
        </p>
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
