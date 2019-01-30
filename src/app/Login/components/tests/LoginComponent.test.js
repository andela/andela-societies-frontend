import React from 'react';
import { shallow } from 'enzyme';
import LoginComponent from '../LoginComponent';

describe('<LoginComponent />', () => {
  const props = {
    history: {
      push: jest.fn()
    }
  }
  
  const shallowWrapper = shallow(<LoginComponent {...props} />);

  it('should contain the title text Societes', () => {
    expect(shallowWrapper.find('.login__pane__title--text').html()).toContain('Societies');
  });
});
