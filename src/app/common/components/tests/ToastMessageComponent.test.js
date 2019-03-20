import React from 'react';
import { shallow } from 'enzyme';
import ToastMessageComponent from '../ToastMessageComponent';

describe('<ButtonComponent />', () => {
  const shallowWrapper = shallow(<ToastMessageComponent> Test Button </ToastMessageComponent>);

  it('should have button element', () => {
    expect(shallowWrapper.html()).toContain('Test Button');
  });
});
