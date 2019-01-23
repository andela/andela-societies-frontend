import React from 'react';
import PropTypes from 'prop-types';

const SocietyStatsComponent = (props) => {
  const { usedPoints, remainingPoints } = props;
  return (
    <div className='society-stats'>
      <hr className='line-graph' />
      <div className='society-stats__desc'>
        <div className='society-stats__desc--used-points'>
          <span className='society-stats__desc-indicator' id='blue-circle' />
          <span className='society-stats__desc-text'> Used points</span>
        </div>
        <div className='society-stats__desc--remaining-points'>
          <span className='society-stats__desc-indicator' id='green-circle' />
          <span className='society-stats__desc-text'> Total Remaining Points</span>
        </div>
      </div>
      <div className='society-stats__desc'>
        <h3 className='stats__description__figure' id='used-points'>
          {usedPoints}
          <span className='stats__description__figure-subsc'>Points</span>
        </h3>
        <h3 className='stats__description__figure' id='remaining-points'>
          {remainingPoints}
          <span className='stats__description__figure-subsc'>Points</span>
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
