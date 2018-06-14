import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import ErrorMessage from '../../src/common/ErrorMessage';

describe('<ErrorMessage />', () => {
  const props = {
    message: 'There is an error',
    retry: stub(),
  };

  const wrapper = shallow(<ErrorMessage {...props} />);

  it('should render without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should display error message passed as props', () => {
    expect(wrapper.find('.error-message').text()).toContain('There is an error');
  });

  it('should display button when passed retry props', () => {
    expect(wrapper.find('.error-message__retry').length).toBe(1);
  });

  it('should not display button when retry has not been passed as props', () => {
    wrapper.setProps({ retry: null });
    expect(wrapper.find('.error-message__retry').length).toBe(0);
  });
});
