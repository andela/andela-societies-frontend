import React from 'react';

// helpers
import capitalizeString from '../../helpers/stringFormatter';

const FormError = ({ errors, fieldName }) => {
  let formErrorContent = null;
  if (errors.indexOf(fieldName) >= 0) {
    formErrorContent = (<span className='field-error'>{capitalizeString(fieldName)} is required</span>);
  }
  return formErrorContent;
};

export default FormError;
