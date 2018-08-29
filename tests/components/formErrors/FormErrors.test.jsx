import React from 'react';
import { shallow } from 'enzyme';
import FormErrors from '../../../src/components/formErrors/FormError';
import capitalizeString from '../../../src/helpers/stringFormatter';

describe('<FormErrors />', () => {
  const field = 'center';
  const props = {
    errors: { [field]: `${capitalizeString(field)} is required` },
    fieldName: 'center',
  };
  const shallowWrapper = shallow(<FormErrors {...props} />);
  it('it renders without crashing', () => {
    expect(shallowWrapper).toHaveLength(1);
  });

  it('it shows the fieldname if it exists in erros array', () => {
    expect(shallowWrapper.text()).toContain('Center is required');
  });
});
