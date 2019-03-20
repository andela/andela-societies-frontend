import React from 'react';
import { ButtonComponent } from '../../common/components';

const ActionsComponent = () => (
  <div className='actions'>
    <ButtonComponent className='action--reject'><div className='cross'>&times;</div></ButtonComponent>
    <ButtonComponent className='action--approve'><div className='checkmark' /></ButtonComponent>
  </div>
);

export default ActionsComponent;
