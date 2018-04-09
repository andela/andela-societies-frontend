import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name redeemButtons
 * @summary Renders a FloatingActionButton
 * @return {jsx} React FAB
 */
const RedeemButtons = props => (
  <div className='hoverButtons'>
    <button className='hoverButtons__button_cancel' onClick={props.onCancel} >x</button>
    <button className='hoverButtons__button_accept' onClick={props.onAccept} >&#10003;</button>
  </div>
);

/**
  * @name propTypes
  * @type {PropType}
  * @param {Object} propTypes - React PropTypes
  * @property {Object} onClick - Event handler for click (and keydown) events
*/
RedeemButtons.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default RedeemButtons;
