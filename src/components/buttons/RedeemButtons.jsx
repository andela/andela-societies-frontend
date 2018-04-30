import React from 'react';

/**
 * @name redeemButtons
 * @summary Renders a FloatingActionButton
 * @return {jsx} React FAB
 */
const RedeemButtons = () => (
  <div className='hoverButtons'>
    <button className='hoverButtons__button_cancel' onClick={e => e.preventDefault} >Reject</button>
    <button className='hoverButtons__button_accept' onClick={e => e.preventDefault} >Approve</button>
  </div>
);

/**
  * @name propTypes
  * @type {PropType}
  * @param {Object} propTypes - React PropTypes
  * @property {Object} onClick - Event handler for click (and keydown) events
*/


export default RedeemButtons;
