import React from 'react';
import PropTypes from 'prop-types';

/**
   * @name Button
   * @summary Returns a button
   * @returns Returns a button
   */
const Button = (props) => {
  const {
    name, className, value, type, disabled, onClick,
  } = props;
  return (
    <button
      name={name}
      className={className}
      value={value}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
/**
 * @name defaultProps
 * @type {PropType}
 * @property {String} type -button type
 */
Button.defaultProps = {
  type: 'button',
  disabled: false,
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
  disabled: PropTypes.bool,
};

export default Button;
