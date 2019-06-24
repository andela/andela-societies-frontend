/* eslint-disable no-unused-expressions */
/**
 * @name validatePointsModal
 * @summary validates the modal data
 * @param data - data to validate
 * @returns {string} - errors
 */
import validator from 'validator';

const validatePointsModal = (data) => {
  const errors = {};
  (validator.isEmpty(data.categoryOption)) ? errors.categoryOption = 'Please select a category' : null;
  (validator.isEmpty(data.description)) ? errors.description = 'Please provide some description' : null;
  return errors;
};

export default validatePointsModal;
