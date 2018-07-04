import React from 'react';
import { mount, shallow } from 'enzyme';
import { stub } from 'sinon';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Redemptions from '../../src/containers/Redemptions';
import storeFixture from '../../src/fixtures/store';
import { redemptions, redemption } from '../../src/fixtures/redemptions';
import filterActivitiesByStatus from '../../src/helpers/filterActivitiesByStatus';
import testProfile from '../../src/fixtures/userProfile';

const store = createMockStore(storeFixture);
const history = { push: () => { }, action: 'PUSH', location: { pathname: '' } };
const event = { preventDefault: () => { } };
const verifyRedemption = jest.fn();
const testRedemptions = [...redemptions, { ...redemption, status: 'rejected' }];
const userProfile = { ...testProfile, roles: { 'society president': 'Kabc' } };

const testProps = {
  requesting: false,
  hasError: false,
  userRoles: Object.keys(userProfile.roles),
  societyName: 'Invictus',
  redemptions,
  history,
  fetchUserInfo: stub(),
  changePageTitle: stub(),
  fetchRedemption: stub().resolves({}),
  verifyRedemption,
};

const setUpWrapper = ({
  requesting = false,
  hasError = false,
} = {}) => {
  const props = {
    ...testProps,
    requesting,
    hasError,
  };
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <Redemptions.WrappedComponent {...props} />
      </MemoryRouter>
    </Provider>);
};

let shallowWrapper;

beforeEach((() => {
  shallowWrapper = shallow(<Redemptions.WrappedComponent
    fetchUserInfo={stub()}
    changePageTitle={stub()}
    fetchRedemption={stub().resolves({})}
    verifyRedemption={verifyRedemption}
  />);
  verifyRedemption.mockClear();
  jest.spyOn(event, 'preventDefault');
}));

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
    expect(mountedWrapper.find('ActivityCard').length).toBe(3);
  });

  it('should render an error message when hasError is true', () => {
    const mountedWrapper = setUpWrapper({ hasError: true });
    expect(mountedWrapper.find('.error-message').length).toBe(1);
  });

  it('should render an Loading... text when requesting is true', () => {
    const mountedWrapper = setUpWrapper({ requesting: true });
    expect(mountedWrapper.find('.activities').html()).toContain('Loading...');
  });

  it('should filter redemptions given status', () => {
    const instance = shallowWrapper.instance();
    const pending = filterActivitiesByStatus(redemptions, 'pending');
    instance.setState({
      allActivities: redemptions,
      filteredActivities: redemptions,
      societyRedemptions: redemptions,
    });
    jest.spyOn(instance, 'filterRedemptions');
    instance.filterRedemptions(event, 'approved');
    expect(instance.state.selectedStatus).toBe('approved');
    expect(instance.state.filteredActivities.length).toBe(pending.length);
  });

  it('should not filter redemptions if given status is all', () => {
    const instance = shallowWrapper.instance();
    instance.setState({
      allActivities: redemptions,
      filteredActivities: redemptions,
      societyRedemptions: redemptions,
    });
    jest.spyOn(instance, 'filterRedemptions');
    instance.filterRedemptions(event, 'all');
    expect(instance.state.selectedStatus).toBe('all');
    expect(instance.state.filteredActivities.length).toBe(redemptions.length);
  });

  it('should update state with details for selected society', () => {
    const tRedemptions = [...redemptions, { ...redemption, status: 'rejected' }];
    const instance = shallowWrapper.instance();
    instance.setState({
      allActivities: testRedemptions,
      filteredActivities: tRedemptions,
      societyRedemptions: tRedemptions,
      selectedSociety: 'istelle',
      selectedStatus: 'all',
    });
    jest.spyOn(instance, 'handleChangeTab');
    instance.handleChangeTab(event, 'invictus');
    expect(instance.state.selectedStatus).toBe('pending');
    expect(instance.state.selectedSociety).toBe('invictus');
    expect(instance.state.societyRedemptions.length).toBe(2);
    expect(instance.state.filteredActivities.length).toBe(1);
  });

  it('should open the modal and set the selected redemption in state', () => {
    const instance = shallowWrapper.instance();
    instance.toggleOpenModal(redemption);
    expect(instance.state.openModal).toBe(true);
    expect(instance.state.selectedRedemption.id).toBe(redemption.id);
  });

  it('should call verifyRedemption thunk when redemption is approved', () => {
    const instance = shallowWrapper.instance();
    instance.setState({
      allActivities: testRedemptions,
      filteredActivities: testRedemptions,
      societyRedemptions: testRedemptions,
    });
    instance.handleClick(true, redemption.id);
    expect(verifyRedemption).toHaveBeenCalled();
  });

  it('should open a modal when a redemption is rejected', () => {
    const instance = shallowWrapper.instance();
    jest.spyOn(instance, 'toggleOpenModal');
    instance.setState({
      allActivities: testRedemptions,
      filteredActivities: testRedemptions,
      societyRedemptions: testRedemptions,
    });
    instance.handleClick(false, redemption.id);
    expect(instance.toggleOpenModal).toHaveBeenCalled();
  });
});
