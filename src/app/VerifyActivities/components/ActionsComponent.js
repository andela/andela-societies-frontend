import React from 'react';
import PropTypes from 'prop-types';
import { ButtonComponent } from '../../common/components';

const ActionsComponent = ({ handleVerify, id }) => (
  <div className='actions'>
    <ButtonComponent
      className='action--reject'
      onClick={() => handleVerify(id, 'rejected')}
    >
      <div className='cross'>&times;</div>
    </ButtonComponent>
    <ButtonComponent
      className='action--approve'
      onClick={() => handleVerify(id, 'approved')}
    >
      <div className='checkmark' />
    </ButtonComponent>
  </div>
);

ActionsComponent.defaultProps = {
  handleVerify: null,
  id: '',
};

ActionsComponent.propTypes = {
  handleVerify: PropTypes.func,
  id: PropTypes.string,
};
export default ActionsComponent;
