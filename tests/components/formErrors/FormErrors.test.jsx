import React from 'react';
import { shallow } from 'enzyme';
import FormErrors from '../../../src/components/formErrors/FormError';

describe('<FormErrors />', () => {
  const props = {
    errors: ['center'],
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
