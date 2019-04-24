import React from 'react';
import PropTypes from 'prop-types';
import { ButtonComponent } from '../../common/components';
import ACTION_STATUS from '../../common/constants';

const ActionsComponent = ({ onClick, id }) => (
  <div className='actions'>
    <ButtonComponent
      className='action--reject'
      onClick={() => onClick(id, ACTION_STATUS.REJECTED)}
    >
      <div className='cross'>&times;</div>
    </ButtonComponent>
    <ButtonComponent
      className='action--approve'
      onClick={() => onClick(id, ACTION_STATUS.PENDING)}
    >
      <div className='checkmark' />
    </ButtonComponent>
  </div>
);

ActionsComponent.defaultProps = {
  onClick: null,
  id: '',
};

ActionsComponent.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
};

export default ActionsComponent;
