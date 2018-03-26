import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/containers/App';

describe('<App />', () => {
  const history = { push: () => { } };
  const fetchUserInfo = () => { };
  const userInfo = {
    name: '',
    picture: '',
  };
  const mounted = mount.bind(
    null,
    <MemoryRouter>
      <App.WrappedComponent
        history={history}
        fetchUserInfo={fetchUserInfo}
        userInfo={userInfo}
      />
    </MemoryRouter>,
  );
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });

  it('should not be able to scroll body when modal is open', () => {
    mounted().find('.fab').simulate('click');
    expect(document.body.classList.contains('noScroll')).toBe(true);
  });

  it('should be able to scroll body when modal is closed', () => {
    const wrapper = mounted();
    // open modal
    wrapper.find('.fab').simulate('click');
    wrapper.find('.modal').simulate('click');
    expect(document.body.classList.contains('noScroll')).toBe(false);
  });
});
