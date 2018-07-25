import moment from 'moment';
import capitalizeString from '../helpers/stringFormatter';

const validateFormFields = (formData) => {
  const today = moment().format('YYYY-MM-DD');
  const errors = {};
  const numberInputs = ['numberOf', 'points'];

  // if any field is empty
  Object.keys(formData).forEach((fieldName) => {
    if (!formData[fieldName].trim().length) {
      const displayText = fieldName === 'activityTypeId' ? 'Category' : fieldName;
      errors[fieldName] = `${capitalizeString(displayText)} is required`;
    }
  });

  // if date typed in is beyond allowed range
  if (formData.date && moment(formData.date).isAfter(today)) {
    errors.date = 'Date entered is out of allowed range';
  }

  // if zero or negaitve number is typed in for number input fields
  numberInputs.forEach((input) => {
    if (parseInt(formData[input], 10) < 1) {
      errors[input] = `${capitalizeString(input)} must be greater than zero`;
    }
  });

  return errors;
};

export default validateFormFields;
