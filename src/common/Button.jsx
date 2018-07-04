import React from 'react';
import PropTypes from 'prop-types';

/**
   * @name Button
   * @summary Returns a button
   * @returns Returns a button
   */
const Button = props => (
  <button
    name={props.name}
    className={props.className}
    value={props.value}
    type={props.type}
    onClick={props.onClick}
  >
    {props.value}
  </button>
);

/**
 * @name defaultProps
 * @type {PropType}
 * @property {String} type -button type
 */
Button.defaultProps = {
  type: 'button',
};
/**
 * @name propTypes
 * @type {PropType}
 * @param {Object} propTypes - React PropTypes
 * @property {String} name - The name of the Button
 * @property {String} className - The ClassName of the button for syling
 * @property {String} value - The name to show in the button
 */
Button.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Button;
