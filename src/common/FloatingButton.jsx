import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name FloatingButton
 * @summary Renders a FloatingButton
 * @return {jsx} React FAB
 */
const FloatingButton = props => (
  <div
    className='fab'
    role='button'
    aria-label=''
    tabIndex='0'
    onClick={props.onClick}
    onKeyDown={props.onClick}
  >
    <svg viewBox='0 0 40 40' className='fab__icon'>
      <line x1='0' y1='20' x2='40' y2='20' />
      <line x1='20' y1='0' x2='20' y2='40' />
    </svg>
  </div>
);

/**
  * @name propTypes
  * @type {PropType}
  * @param {Object} propTypes - React PropTypes
  * @property {Object} onClick - Event handler for click (and keydown) events
*/
FloatingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FloatingButton;
