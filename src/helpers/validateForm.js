const validateFormFields = (formData) => {
  let errors = [];
  errors = Object.keys(formData).filter(fieldName => !formData[fieldName].trim().length);
  return errors;
};

export default validateFormFields;
