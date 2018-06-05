import validate from '../../src/helpers/validate';

describe('input validation helper', () => {
  const formData = {
    activityTypeId: 'as78a7s8asasas89',
    date: '',
    description: '',
  };
  it('should return array with correct number of errors', () => {
    const errors = validate(formData);
    expect(errors.length).toBe(2);
  });
});
