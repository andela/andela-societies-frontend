import React from 'react';
import { shallow } from 'enzyme';
import LoginContainer from '../LoginContainer';

describe('<LoginContainer />', () => {
  const props = {
    history: {
      push: jest.fn()
    }
  }
  
  const shallowWrapper = shallow(<LoginContainer {...props} />);

  it('should contain the text Be part of something big', () => {
    expect(shallowWrapper.find('.login__pane__description--title').html()).toContain('Be part of something big.');
  });
});
