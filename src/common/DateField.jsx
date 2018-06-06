import React from 'react';
import PropTypes from 'prop-types';

/**
* @name DateField
* @summary Returns html 5 datefield
* @returns Returns html 5 datefield
*/
const DateField = props => (
  <div className='formField'>
    <span className='formField__label'>Date</span>
    <input
      className='formField formField__control'
      name='date'
      type='date'
      onChange={props.handleChange}
      value={props.value}
    />
  </div>
);

/**
* @name propTypes
* @type {PropType}
* @param {Object} propTypes - React PropTypes
* @property {String} name - The name of the textArea
*/
DateField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
export default DateField;
