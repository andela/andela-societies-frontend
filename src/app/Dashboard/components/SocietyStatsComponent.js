import React from 'react';
import PropTypes from 'prop-types';

import { StatusIndicatorComponent, ProgressBarComponent } from '../../common/components';

import { societyStats } from '../constants';

const SocietyStatsComponent = (props) => {
  const { society, usedPoints, remainingPoints } = props;
  return (
    <div className='society-stats'>
      <ProgressBarComponent
        earnedOrUsedPoints={usedPoints}
        remPointsOrActivitiesLogged={remainingPoints}
      />
      <div className='society-stats__desc'>
        <div className='society-stats__desc__points'>
          <StatusIndicatorComponent className='society-stats--used-points-indicator' status='completed' />
          <span className='society-stats__desc-text'> Used points</span>
        </div>
        <div className='society-stats__desc__points' id='society-stats__desc--remaining-points'>
          <StatusIndicatorComponent status='approved' />
          <span className='society-stats__desc-text'> Total Remaining Points</span>
        </div>
      </div>
      <div className='society-stats__desc'>
        <p className='stats__description__figure' id='used-points'>
          {usedPoints}
          <span className='stats__description__figure-subsc '>Points</span>
        </p>
        <p className='stats__description__figure' id='remaining-points'>
          {remainingPoints}
          <span className='stats__description__figure-subsc '>Points</span>
        </p>
        <span className={`society-stats__desc__logo ${society.toLowerCase()}`} />
      </div>
    </div>
  );
};

SocietyStatsComponent.defaultProps = {
  society: societyStats.society,
  usedPoints: societyStats.usedPoints,
  remainingPoints: societyStats.remainingPoints,
};

SocietyStatsComponent.propTypes = {
  society: PropTypes.string,
  usedPoints: PropTypes.number,
  remainingPoints: PropTypes.number,
};

export default SocietyStatsComponent;
