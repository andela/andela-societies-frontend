import React from 'react';
import { shallow } from 'enzyme';
import ButtonComponent from '../ButtonComponent';

describe('<ButtonComponent />', () => {
  const shallowWrapper = shallow(<ButtonComponent> Test Button </ButtonComponent>);

  it('should have button element', () => {
    expect(shallowWrapper.html()).toContain('Test Button');
  });
});
