import React from 'react';
import PropTypes from 'prop-types';

import { StatusIndicatorComponent, ProgressBarComponent } from '../../common/components';

import { societyStats } from '../constants';

const SocietyStatsComponent = (props) => {
  const {
    society, usedPoints, remainingPoints, className, totalPoints, activitiesLogged,
  } = props;
  let totalPointsActivitiesLoggedText;
  let pointsHtml;
  let separatorHtml;
  if (totalPoints && activitiesLogged) {
    totalPointsActivitiesLoggedText = (
      <div className='society-stats__desc'>
        <p>Total Points Earned</p>
        <p className='right-side'>
          Activities Logged
        </p>
      </div>
    );
    pointsHtml = (
      <div className='society-stats__desc'>
        <p className='stats__description__figure' id='points-earned'>
          {totalPoints}
          <span>Points</span>
        </p>
        <p className='stats__description__figure right-side' id='activities-logged'>
          {activitiesLogged}
          <span>
            Activities
          </span>
        </p>
      </div>
    );
    separatorHtml = (
      <div className='society-stats__separator' />
    );
  }
  return (
    <div className={`society-stats ${className}`}>
      {totalPointsActivitiesLoggedText}
      {pointsHtml}
      <ProgressBarComponent earnedOrUsedPoints={usedPoints} remPointsOrActivitiesLogged={remainingPoints} />
      {separatorHtml}
      <div className='society-stats__desc'>
        <div className='society-stats__desc__points'>
          <StatusIndicatorComponent status='completed' />
          <span className='society-stats__desc-text'> Used points</span>
        </div>
        <div className='society-stats__desc__points right-side' id='society-stats__desc--remaining-points'>
          <StatusIndicatorComponent status='approved' />
          <span className='society-stats__desc-text'> Total Remaining Points</span>
        </div>
      </div>
      <div className='society-stats__desc'>
        <p className='stats__description__figure' id='used-points'>
          {usedPoints}
          <span>Points</span>
        </p>
        <p className='stats__description__figure right-side' id='remaining-points'>
          {remainingPoints}
          <span>Points</span>
        </p>
        <span className={`society-stats__desc__logo ${society.toLowerCase()}`} />
      </div>
    </div>
  );
};

SocietyStatsComponent.defaultProps = {
  society: societyStats.society,
  usedPoints: societyStats.usedPoints,
  className: '',
  totalPoints: societyStats.totalPoints,
  remainingPoints: societyStats.remainingPoints,
  activitiesLogged: societyStats.activitiesLogged,
};

SocietyStatsComponent.propTypes = {
  society: PropTypes.string,
  usedPoints: PropTypes.number,
  remainingPoints: PropTypes.number,
  className: PropTypes.string,
  totalPoints: PropTypes.number,
  activitiesLogged: PropTypes.number,
};

export default SocietyStatsComponent;
