import React from 'react';
import { shallow } from 'enzyme';
import ButtonComponent from '../ButtonComponent';

describe('<ButtonComponent />', () => {
  const shallowWrapper = shallow(<ButtonComponent> Test Button </ButtonComponent>);

  it('should have button element', () => {
    expect(shallowWrapper.find('.button').html()).toContain('Test Button');
  });
});
