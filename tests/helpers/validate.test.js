import moment from 'moment';
import validate from '../../src/helpers/validate';

describe('input validation helper', () => {
  const formData = {
    activityTypeId: 'as78a7s8asasas89',
    date: '',
    description: '',
  };
  it('should return an errors object with the correct number of fields', () => {
    const errors = validate(formData);
    expect(Object.keys(errors).length).toBe(2);
  });

  it('should set the invalid date error', () => {
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    const formDataWithFutureDate = { ...formData, date: tomorrow };
    const errors = validate(formDataWithFutureDate);
    expect(errors.date).toBe('Date entered is out of allowed range');
  });

  it('should set the number is less than 0 error', () => {
    const formDataWithZeroNumberOf = { ...formData, noOfParticipants: '0' };
    const errors = validate(formDataWithZeroNumberOf);
    expect(errors.noOfParticipants).toBe('NoOfParticipants must be greater than zero');
  });
});
