import React from 'react';
import PropTypes from 'prop-types';

/**
   * @name Buttun
   * @summary Returns a button
   * @returns Returns a button
   */
const Buttons = props => (
  <div className='form-group'>
    <button
      name={props.name}
      className={props.className}
      value={props.value}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  </div>
);
/**
    * @name propTypes
    * @type {PropType}
    * @param {Object} propTypes - React PropTypes
    * @property {String} name - The name of the Button
    *@property {String} className - The ClassName of the button for syling
    *@property {String} value - The name to show in the button
  */
Buttons.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Buttons;
