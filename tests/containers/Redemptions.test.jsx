import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Redemptions from '../../src/containers/Redemptions';
import storeFixture from '../../src/fixtures/store';
import { redemptions } from '../../src/fixtures/redemptions';

const store = createMockStore(storeFixture);
const history = { push: () => { }, action: 'PUSH', location: { pathname: '' } };

const setUpWrapper = ({
  requesting = false,
  hasError = false,
} = {}) => {
  const props = {
    requesting,
    hasError,
    redemptions,
    history,
    fetchUserInfo: stub(),
    changePageTitle: stub(),
    fetchRedemption: stub().resolves({}),
  };
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <Redemptions.WrappedComponent {...props} />
      </MemoryRouter>
    </Provider>);
};

describe('<Redemptions />', () => {
  it('should render without crashing', () => {
    expect(setUpWrapper().length).toBe(1);
  });

  it('should render PageHeader', () => {
    expect(setUpWrapper().find('PageHeader').length).toBe(1);
  });

  it('should render MasonryLayout', () => {
    expect(setUpWrapper().find('MasonryLayout').length).toBe(1);
  });

  it('should render RedemptionCards', () => {
    const mountedWrapper = setUpWrapper();
    mountedWrapper.setState({ allActivities: redemptions, filteredActivities: redemptions });
    expect(mountedWrapper.state().allActivities).toEqual(redemptions);
    expect(mountedWrapper.find('RedemptionCard').length).toBe(3);
  });

  it('should render an error message when hasError is true', () => {
    const mountedWrapper = setUpWrapper({ hasError: true });
    expect(mountedWrapper.find('.error-message').length).toBe(1);
  });

  it('should render an Loading... text when requesting is true', () => {
    const mountedWrapper = setUpWrapper({ requesting: true });
    expect(mountedWrapper.find('.activities').html()).toContain('Loading...');
  });
});
