import React from 'react';
import { shallow } from 'enzyme';
import ToastMessageComponent from '../ToastMessageComponent';

describe('<ToastMessageComponent />', () => {
  const shallowWrapper = shallow(<ToastMessageComponent> Toast Message </ToastMessageComponent>);

  it('should have button element', () => {
    expect(shallowWrapper.html()).toContain('Toast Message');
  });
});
