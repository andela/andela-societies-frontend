import React from 'react';
import { shallow } from 'enzyme';
import NavbarComponent from '../NavbarComponent';

describe('<NavbarComponent />', () => {
  const shallowWrapper = shallow(<NavbarComponent />);

  it('should have the class navbar', () => {
    expect(shallowWrapper.find('.navbar')).toHaveLength(1);
  });
});
