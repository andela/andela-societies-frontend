import React from 'react';

const FormError = ({ errors, fieldName }) => {
  let formErrorContent = null;
  if (Object.keys(errors).indexOf(fieldName) >= 0) {
    formErrorContent = (<span className='field-error'>{ errors[fieldName] }</span>);
  }
  return formErrorContent;
};

export default FormError;
