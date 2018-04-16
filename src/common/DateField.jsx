import React from 'react';

/**
* @name DateField
* @summary Returns html 5 datefield
* @returns Returns html 5 datefield
*/
const DateField = () => (
  <div className='formField'>
    <span className='formField__label'>Date</span>
    <input
      className='formField__control'
      name='date'
      type='date'
    />
  </div>
);
export default DateField;
