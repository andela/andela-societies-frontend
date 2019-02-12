import React from 'react';
import PropTypes from 'prop-types';

import { societyStats } from '../constants';

const SocietyStatsComponent = (props) => {
  const { society, usedPoints, remainingPoints } = props;
  return (
    <div className='society-stats'>
      <div className='progress'>
        <div
          className='progress-bar'
          role='progressbar'
          id='progress-bar--blue'
          aria-valuenow='65'
          aria-valuemin='0'
          aria-valuemax='100'
        />
        <div
          className='progress-bar'
          role='progressbar'
          id='progress-bar--green'
          aria-valuenow='35'
          aria-valuemin='0'
          aria-valuemax='100'
        />
      </div>
      <div className='society-stats__desc'>
        <div className='society-stats__desc__points'>
          <span className='society-stats__desc-indicator' id='blue-circle' />
          <span className='society-stats__desc-text'> Used points</span>
        </div>
        <div className='society-stats__desc__points' id='society-stats__desc--remaining-points'>
          <span className='society-stats__desc-indicator' id='green-circle' />
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
  society: '',
  usedPoints: societyStats.usedPoints,
  remainingPoints: societyStats.remainingPoints,
};

SocietyStatsComponent.propTypes = {
  society: PropTypes.string,
  usedPoints: PropTypes.number,
  remainingPoints: PropTypes.number,
};


export default SocietyStatsComponent;
