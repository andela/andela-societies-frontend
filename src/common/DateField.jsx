import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

/**
* @name DateField
* @summary Returns html 5 datefield
* @returns Returns html 5 datefield
*/
const DateField = ({ handleChange, value }) => {
  const today = moment().format('YYYY-MM-DD');
  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  return (
    <div className='formField'>
      <span className='formField__label'>Date</span>
      <input
        className='formField formField__control'
        name='date'
        type='date'
        onChange={handleChange}
        value={value}
        max={today}
        min={startOfMonth}
      />
    </div>
  );
};

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
