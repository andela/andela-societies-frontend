// Third party libraries
import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router-dom';
import { spy } from 'sinon';
import storeFixture from '../../src/fixtures/store';
import 'jest-localstorage-mock';

// Components
import Home from '../../src/containers/Home';

// Fixtures
import testProfile from '../../src/fixtures/userProfile';

const store = createMockStore(storeFixture);

let mountedWrapper;
let shallowWrapper;

const props = {
  fetchUserProfile: jest.fn(),
  history: { 
    push: jest.fn(),
    location: { pathname: '' }
  },
  profile: '',
};

describe('<Home />', () => {
  beforeEach(() => {
    mountedWrapper = mount((
      <Provider store={store} >
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    ));

    shallowWrapper = shallow((
      <Home.WrappedComponent {...props} />
    ));
  });

  it('should render without crashing', () => {
    expect(mountedWrapper.length).toBe(1);
  });

  it('should render a loader', () => {
    expect(mountedWrapper.find('Loader').length).toBe(1);
  });

  it('should navigate cio user to the redemptions page', () => {
    const cioProfile = { ...testProfile, roles: { CIO: 'Kabc' } };
    const instance = shallowWrapper.instance();
    jest.spyOn(instance, 'navigate');
    instance.navigate(cioProfile);
    expect(instance.props.history.push).toBeCalledWith({ pathname: '/u/redemptions' });
  });

  it('should navigate success ops user to the verify activities page', () => {
    const successOpsProfile = { ...testProfile, roles: { 'success ops': 'Kabc' } };
    const instance = shallowWrapper.instance();
    jest.spyOn(instance, 'navigate');
    instance.navigate(successOpsProfile);
    expect(instance.props.history.push).toBeCalledWith({ pathname: '/u/verify-activities' });
  });

  it('should navigate fellow user to the my activities page', () => {
    const successOpsProfile = { ...testProfile, roles: { fellow: 'Kabc' } };
    const instance = shallowWrapper.instance();
    jest.spyOn(instance, 'navigate');
    instance.navigate(successOpsProfile);
    expect(instance.props.history.push).toBeCalledWith({ pathname: '/u/my-activities' });
  });

  it('should navigate success ops user to the page he/she was last on', () => {
    const currentLocation = '/u/categories';
    sessionStorage.setItem('Location', currentLocation);
    const successOpsProfile = { ...testProfile, roles: { 'success ops': 'Kabc' } };
    const instance = shallowWrapper.instance();
    instance.navigate(successOpsProfile);
    expect(instance.props.history.push).toBeCalledWith({ pathname: currentLocation });
  });

  it('should navigate fellow user to the page he/she was last on', () => {
    const currentLocation = '/u/verify-activities';
    sessionStorage.setItem('Location', currentLocation);
    const successOpsProfile = { ...testProfile, roles: { fellow: 'Kabc' } };
    const instance = shallowWrapper.instance();
    instance.navigate(successOpsProfile);
    expect(instance.props.history.push).toBeCalledWith({ pathname: currentLocation });
  });

  it('should call componentDidUpdate and navigate', () => {
    const componentDidUpdateSpy = spy(Home.WrappedComponent.prototype, 'componentDidUpdate');
    const instance = shallowWrapper.instance();
    instance.setState({ profile: { ...testProfile }});
    shallowWrapper.setProps({ profile: {...testProfile } });
    expect(componentDidUpdateSpy.called).toBeTruthy();
  });
});

