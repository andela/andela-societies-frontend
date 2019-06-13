import React from 'react';
import PropTypes from 'prop-types';

import { myStats } from '../constants';

const MyStatsComponent = (props) => {
  const { points, activities } = props;
  return (
    <div className='stats'>
      <div className='stats__points'>
        <p className='stats__description'>My Total Points Earned</p>
        <p className='stats__description__figure my-stats'>
          {points}
          <span>Points</span>
        </p>
      </div>
      <div className='stats__activities'>
        <p className='stats__description'>My Activities Logged</p>
        <p className='stats__description__figure my-stats'>
          {activities}
          <span>Activities</span>
        </p>
      </div>
    </div>
  );
};

MyStatsComponent.defaultProps = {
  points: myStats.points,
  activities: myStats.activities,
};


MyStatsComponent.propTypes = {
  points: PropTypes.number,
  activities: PropTypes.number,
};

export default MyStatsComponent;
