import React from 'react';
import PropTypes from 'prop-types';

const ProgressBarComponent = (props) => {
  const { earnedOrUsedPoints, remPointsOrActivitiesLogged } = props;
  const total = earnedOrUsedPoints + remPointsOrActivitiesLogged;
  const blueValue = (earnedOrUsedPoints * 100) / total;
  const greenValue = (remPointsOrActivitiesLogged * 100) / total;
  return (
    <div className='progress'>
      <div
        className='progress-bar'
        role='progressbar'
        id='progress-bar--blue'
        aria-valuenow={Number(blueValue)}
        aria-valuemin='0'
        aria-valuemax='100'
      />
      <div
        className='progress-bar'
        role='progressbar'
        id='progress-bar--green'
        aria-valuenow={Number(greenValue)}
        aria-valuemin='0'
        aria-valuemax='100'
      />
    </div>
  );
};

ProgressBarComponent.defaultProps = {
  earnedOrUsedPoints: 0,
  remPointsOrActivitiesLogged: 0,
};

ProgressBarComponent.propTypes = {
  earnedOrUsedPoints: PropTypes.number,
  remPointsOrActivitiesLogged: PropTypes.number,
};

export default ProgressBarComponent;
