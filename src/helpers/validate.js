const validateFormFields = (formData) => {
  const fieldArray = Object.keys(formData);
  const errors = [];
  for (let i = 0; i < fieldArray.length; i += 1) {
    if (!formData[fieldArray[i]].trim().length) {
      errors.push(fieldArray[i]);
    }
  }
  return errors;
};

export default validateFormFields;
