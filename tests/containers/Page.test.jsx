import React from 'react';
import { mount, shallow } from 'enzyme';
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
  const testProps = {
    title: '',
    location: '',
    history,
    categories,
    children: '',
    profile: {},
    userInfo: {
      name: 'test test',
      picture: 'https://lh3.googleusercontent.com/-Ke1NKb5MPuk/AAAAAAAAAAI/AAAAAAAAABg/8ofOe_CueLA/photo.jpg?sz=50',
    },
    fetchUserProfile: () => { },
    fetchSocietyInfo: () => { },
    fetchUserInfo: () => { },
    changeTitle: () => { },
    changeSocietyPageHeaderTitle: () => {},
    updating: false,
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

  const setUpWrapper = ({
    location = { pathname: '/u/my-activities' },
    profile = {
      society: {
        name: 'iStelle',
      },
      roles: {
        'society president': '-Kabc',
      },
    },
  } = {}) => {
    const props = {
      ...testProps,
      location,
      profile,
    };

    const shallowMount = shallow(<Page.WrappedComponent
      {...props}
    />);
    const wrapper = mount(<Provider store={store}>
      <MemoryRouter><Page.WrappedComponent
        {...props}
      />
      </MemoryRouter>
    </Provider>);
    return {
      shallowMount,
      wrapper,
    };
  };
  it('should render without crashing', () => {
    const { wrapper } = setUpWrapper();
    expect(wrapper.length).toBe(1);
  });

  it('should not be able to scroll body when modal is open', () => {
    const { wrapper } = setUpWrapper();
    wrapper.find('.fab').simulate('click');
    expect(document.body.classList.contains('noScroll')).toBe(true);
  });

  it('should not open modal when the enter key is pressed', () => {
    const { wrapper } = setUpWrapper();
    wrapper.setState({ showModal: false });
    wrapper.find('.fab').simulate('keydown', { key: 'Enter' });
    expect(wrapper.state().showModal).toBe(false);
  });

  it('should change the value of the current title when handleChangeHeader method is called', () => {
    const { shallowMount } = setUpWrapper();
    const instance = shallowMount.instance();
    instance.handleChangeHeader('Leadership');
    expect(shallowMount.state().currentTitle).toBe('Leadership');
  });

  it('should update the value of the title when updateTitle method is called', () => {
    const { shallowMount } = setUpWrapper();
    const instance = shallowMount.instance();
    instance.updateTitle('Leadership');
    expect(shallowMount.state().currentTitle).toBe('Leadership');
  });

  it('should be able to scroll body when modal is closed', () => {
    const { wrapper } = setUpWrapper();
    // open modal
    wrapper.find('.fab').simulate('click');
    wrapper.find('.modal').simulate('click');
    expect(document.body.classList.contains('noScroll')).toBe(false);
  });

  it('should render sidebar', () => {
    const { wrapper } = setUpWrapper();
    const sidebar = wrapper.find('Sidebar');
    expect(sidebar).toHaveLength(1);
  });

  it('should render header', () => {
    const { wrapper } = setUpWrapper();
    const header = wrapper.find('Header');
    expect(header).toHaveLength(1);
  });

  it('should render modal', () => {
    const { wrapper } = setUpWrapper();
    const modal = wrapper.find('Modal');
    expect(modal).toHaveLength(1);
  });

  it('should render floating button', () => {
    const { wrapper } = setUpWrapper();
    const floatingButton = wrapper.find('FloatingButton');
    expect(floatingButton).toHaveLength(1);
  });

  it('should not contain the FloatingActionButton when pathname is verify-activities', () => {
    const { wrapper } = setUpWrapper({
      location: { pathname: '/u/verify-activities' },
    });
    const floatingButton = wrapper.find('FloatingButton');
    expect(floatingButton).toHaveLength(0);
  });

  it('should contain the LogActivityForm when pathname is /u/my-activities', () => {
    const { wrapper } = setUpWrapper();
    const logActivityForm = wrapper.find('LogActivityForm');
    expect(logActivityForm).toHaveLength(1);
  });

  it('should show modal when path name is /u/my-activities and selectedItem has property of id', () => {
    const { wrapper } = setUpWrapper({
      location: { pathname: '/u/my-activities' },
      selectedItem: { id: 'qwertyuio' },
    });
    const modal = wrapper.find('Modal');
    expect(modal).toHaveLength(1);
  });

  it('should show the CreateCategoryForm for the Success Ops user on the categories page', () => {
    const { wrapper } = setUpWrapper({
      location: { pathname: '/u/categories' },
      profile: {
        roles: { 'success ops': 'abcd' },
      },
    });
    const createCategoryForm = wrapper.find('CreateCategoryForm');
    expect(createCategoryForm).toHaveLength(1);
  });

  it('should contain the RedeemPointsForm when pathname is /u/redemptions', () => {
    const { wrapper } = setUpWrapper({ location: { pathname: '/u/redemptions' } });
    const redeemPointsForm = wrapper.find('RedeemPointsForm');
    expect(redeemPointsForm).toHaveLength(1);
  });

  it('Verify activities page should work without floating action button in /u/verify-activities', () => {
    const { wrapper } = setUpWrapper({ location: { pathname: '/u/verify-activities' } });
    const verifyActivities = wrapper;
    expect(verifyActivities).toHaveLength(1);
  });

  it('should show comments form for the cio on the redemptions page', () => {
    const { wrapper } = setUpWrapper({
      location: { pathname: '/u/redemptions' },
      profile: {
        roles: { cio: 'abcd' },
      },
    });
    const commentsForm = wrapper.find('CommentsForm');
    expect(commentsForm).toHaveLength(1);
  });
});

