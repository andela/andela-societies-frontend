import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import Page from '../../src/containers/Page';
import storeFixture from '../../src/fixtures/store';
import categories from '../../src/fixtures/categories';

const store = createMockStore(storeFixture);
const history = { push: () => { }, location: { pathname: '/u/my-activities' }, action: 'PUSH' };

describe('<Page />', () => {
  // setting up a mount wrapper with props
  const setUpWrapper = ({
    location = { pathname: '/u/my-activities' },
  } = {}) => {
    const props = {
      location,
      history,
      categories,
      children: '',
      profile: {
        society: {
          name: 'iStelle',
        },
      },
      userInfo: {
        name: 'test test',
        picture: 'https://lh3.googleusercontent.com/-Ke1NKb5MPuk/AAAAAAAAAAI/AAAAAAAAABg/8ofOe_CueLA/photo.jpg?sz=50',
      },
      fetchUserProfile: () => {},
      fetchSocietyInfo: () => {},
      fetchUserInfo: () => { },
      changePageTitle: () => { },
      societyInfo: {
        requesting: false,
        error: {},
        info: {
          name: 'iStelle',
          remainingPoints: 0,
          image: '',
        },
      },
    };

    return mount(<Provider store={store}><MemoryRouter><Page.WrappedComponent {...props} /></MemoryRouter></Provider>);
  };
  it('should render without crashing', () => {
    const wrapper = setUpWrapper();
    expect(wrapper.length).toBe(1);
  });

  it('should not be able to scroll body when modal is open', () => {
    setUpWrapper().find('.fab').simulate('click');
    expect(document.body.classList.contains('noScroll')).toBe(true);
  });

  it('should be able to scroll body when modal is closed', () => {
    const wrapper = setUpWrapper();
    // open modal
    wrapper.find('.fab').simulate('click');
    wrapper.find('.modal').simulate('click');
    expect(document.body.classList.contains('noScroll')).toBe(false);
  });

  it('should render sidebar', () => {
    const sidebar = setUpWrapper().find('Sidebar');
    expect(sidebar).toHaveLength(1);
  });

  it('should render header', () => {
    const header = setUpWrapper().find('Header');
    expect(header).toHaveLength(1);
  });

  it('should render modal', () => {
    const modal = setUpWrapper().find('Modal');
    expect(modal).toHaveLength(1);
  });

  it('should render floating button', () => {
    const floatingButton = setUpWrapper().find('FloatingButton');
    expect(floatingButton).toHaveLength(1);
  });

  it('should contain the LogActivityForm when pathname is /u/my-activities', () => {
    const logActivityForm = setUpWrapper().find('LogActivityForm');
    expect(logActivityForm).toHaveLength(1);
  });
  it('should contain the RedeemPointsForm when pathname is /u/redemptions', () => {
    const redeemPointsForm = setUpWrapper({ location: { pathname: '/u/redemptions' } }).find('RedeemPointsForm');
    expect(redeemPointsForm).toHaveLength(1);
  });
});
