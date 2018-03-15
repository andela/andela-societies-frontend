import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import localStorage from 'mock-local-storage';

import SignIn from '../../src/containers/SignIn';

global.window = {};
window.localStorage = global.localStorage;

describe('<SignIn />', () => {
  const wrapper = mount(<MemoryRouter><SignIn /></MemoryRouter>);

  it('should render successfully', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should have SignIn component', () => {
    expect(wrapper.find(SignIn).length).toBe(1);
  });

  it('should have initial state property signInError as false', () => {
    expect(wrapper.find('SignIn').instance().state).toHaveProperty('signInError', false);
  });
});
