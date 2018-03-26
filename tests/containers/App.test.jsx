import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import App from '../../src/containers/App';

const store = createMockStore({
  pageInfo: {
    url: '',
    title: '',
  },
  userInfo: {
    name: '',
    picture: '',
  },
});

describe('<App />', () => {
  const history = { push: () => { } };

  const mounted = mount.bind(
    null,
    <Provider store={store}>
      <MemoryRouter>
        <App
          history={history}
          fetchUserInfo={() => {}}
          changePageTitle={() => {}}
        />
      </MemoryRouter>
    </Provider>,
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
