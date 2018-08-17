import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import DEFAULT_DATE_FORMAT from '../constants/dataFormats';

/**
* @name DateField
* @summary Returns html 5 datefield
* @returns Returns html 5 datefield
*/
const DateField = ({ handleChange, value }) => {
  const today = moment().format(DEFAULT_DATE_FORMAT);
  const minDate = moment().subtract(30, 'days').format(DEFAULT_DATE_FORMAT);
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
        min={minDate}
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
