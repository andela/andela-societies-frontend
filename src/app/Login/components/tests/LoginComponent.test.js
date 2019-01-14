import React from 'react';
import { shallow } from 'enzyme';
import LoginComponent from '../LoginComponent';

describe('<LoginComponent />', () => {
  const shallowWrapper = shallow(<LoginComponent />);

  it('should contain the title text Societes', () => {
    expect(shallowWrapper.find('.login__pane__title--text').html()).toContain('Societies');
  });
});
