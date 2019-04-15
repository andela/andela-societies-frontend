import React from 'react';
import PropTypes from 'prop-types';
import { ButtonComponent } from '.';
import ACTIVITY_STATUS from '../constants';

const ActionsComponent = ({ id, onClick }) => (
  <div className='actions'>
    <ButtonComponent className='action--reject' onClick={() => onClick(id, ACTIVITY_STATUS.REJECTED)}>
      <div className='cross'>&times;</div>
    </ButtonComponent>
    <ButtonComponent className='action--approve' onClick={() => onClick(id, ACTIVITY_STATUS.APPROVED)}>
      <div className='checkmark' />
    </ButtonComponent>
  </div>
);

ActionsComponent.defaultProps = {
  id: '',
  onClick: null,
};

ActionsComponent.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
};

export default ActionsComponent;
