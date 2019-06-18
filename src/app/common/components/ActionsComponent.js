import React from 'react';
import PropTypes from 'prop-types';
import { ButtonComponent } from '.';
import ACTIVITY_STATUS from '../constants';

const ActionsComponent = ({ id, onClick, userRole }) => {
  let status = ACTIVITY_STATUS.APPROVED;
  if (userRole && Object.keys(userRole).includes('society secretary')) {
    status = ACTIVITY_STATUS.PENDING;
  }
  return (
    <div className='actions'>
      <ButtonComponent className='action--reject' onClick={() => onClick(id, ACTIVITY_STATUS.REJECTED)}>
        <div className='cross'>&times;</div>
      </ButtonComponent>
      <ButtonComponent className='action--approve' onClick={() => onClick(id, status)}>
        <div className='checkmark' />
      </ButtonComponent>
    </div>
  );
};

ActionsComponent.defaultProps = {
  id: '',
  userRole: {},
  onClick: null,
};

ActionsComponent.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  userRole: PropTypes.shape({}),
};

export default ActionsComponent;
