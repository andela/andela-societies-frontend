import React from 'react';

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
