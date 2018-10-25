// Third party libraries
import React from 'react';
import { mount, shallow } from 'enzyme';
import { stub, spy } from 'sinon';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import 'jest-localstorage-mock';

// Components
import Redemptions from '../../src/containers/Redemptions';

// fixtures
import storeFixture from '../../src/fixtures/store';
import { redemptions, redemption } from '../../src/fixtures/redemptions';
import testProfile from '../../src/fixtures/userProfile';

// helpers and constants
import filterActivitiesByStatus from '../../src/helpers/filterActivitiesByStatus';
import clickActions from '../../src/constants/clickAction';

const { EDIT } = clickActions;

const store = createMockStore(storeFixture);
const history = { push: () => { }, action: 'PUSH', location: { pathname: '' } };
const event = { preventDefault: () => { } };
const verifyRedemption = jest.fn();
const completeRedemptionFinance = jest.fn();
const testRedemptions = [...redemptions, { ...redemption, status: 'rejected' }];
const userProfile = { ...testProfile, roles: { 'society president': 'Kabc' } };
const fetchRedemptionSpy = spy();

const testProps = {
  requesting: false,
  hasError: false,
  userRoles: Object.keys(userProfile.roles),
  societyName: 'invictus',
  redemptions,
  history,
  fetchUserInfo: stub(),
  changePageTitle: stub(),
  fetchRedemption: fetchRedemptionSpy,
  verifyRedemption,
  completeRedemptionFinance,
};

const setUpWrapper = ({
  userProfile = { ...testProfile, roles: { 'society president': 'Kabc' } },
  requesting = false,
  hasError = false,
} = {}) => {
  const props = {
    ...testProps,
    userRoles: Object.keys(userProfile.roles),
    requesting,
    hasError,
  };
  const mountedWrapper = mount((
    <Provider store={store}>
      <MemoryRouter>
        <Redemptions.WrappedComponent {...props} />
      </MemoryRouter>
    </Provider>
  ));
  const shallowWrapper = shallow(<Redemptions.WrappedComponent
    {...props}
  />);
  return {
    mountedWrapper,
    shallowWrapper,
  };
};

beforeEach((() => {
  verifyRedemption.mockClear();
  jest.spyOn(event, 'preventDefault');
}));

describe('<Redemptions />', () => {
  it('should render without crashing', () => {
    const { mountedWrapper } = setUpWrapper();
    expect(mountedWrapper.length).toBe(1);
  });

  it('should render PageHeader', () => {
    const { mountedWrapper } = setUpWrapper();
    expect(mountedWrapper.find('PageHeader').length).toBe(1);
  });

  it('should render MasonryLayout', () => {
    const { mountedWrapper } = setUpWrapper();
    expect(mountedWrapper.find('MasonryLayout').length).toBe(1);
  });

  it('should render pending RedemptionCards', () => {
    const { mountedWrapper } = setUpWrapper();
    mountedWrapper.setState({ filteredActivities: redemptions });
    const filterRes = redemptions.filter(redemption => redemption.status === 'pending');
    expect(mountedWrapper.find('ActivityCard').length).toBe(filterRes.length);
  });

  it('should render an error message when hasError is true', () => {
    const { mountedWrapper } = setUpWrapper({ hasError: true });
    expect(mountedWrapper.find('.error-message').length).toBe(1);
  });

  it('should render a loader when requesting is true', () => {
    const { mountedWrapper } = setUpWrapper({ requesting: true });
    expect(mountedWrapper.find('Loader').length).toBe(1);
  });

  it('should filter redemptions given status', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    const societyRedemptions = instance.getSocietyRedemptions();
    const approved = filterActivitiesByStatus(societyRedemptions, 'approved');
    instance.setState({
      filteredActivities: redemptions,
    });
    instance.filterRedemptions('approved');
    expect(instance.state.selectedStatus).toBe('approved');
    expect(instance.state.filteredActivities.length).toBe(approved.length);
  });

  it('should not filter redemptions if given status is all', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    const societyRedemptions = instance.getSocietyRedemptions();
    instance.setState({
      filteredActivities: redemptions,
    });
    instance.filterRedemptions('all');
    expect(instance.state.selectedStatus).toBe('all');
    expect(instance.state.filteredActivities.length).toBe(societyRedemptions.length);
  });

  it('should update state with details for selected society', () => {
    const tRedemptions = [...redemptions, { ...redemption, status: 'rejected' }];
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    instance.setState({
      filteredActivities: tRedemptions,
      selectedSociety: 'istelle',
      selectedStatus: 'all',
    });
    jest.spyOn(instance, 'handleChangeTab');
    instance.handleChangeTab(event, 'invictus');
    expect(instance.state.selectedSociety).toBe('invictus');
    expect(instance.state.filteredActivities.length).toBe(1);
  });

  it('should update state of filteredActivities when role is Finance', () => {
    const { shallowWrapper } = setUpWrapper({ userProfile: { roles: { finance: 'Kabc' } } });
    const instance = shallowWrapper.instance();
    instance.handleChangeTab(event, 'phoenix');
    expect(instance.state.selectedSociety).toBe('phoenix');
    expect(instance.state.selectedStatus).toBe('all');
    expect(instance.state.filteredActivities.length).toBe(0);
  });

  it('should update state of selectedStatus to all when role is Finance', () => {
    const { shallowWrapper } = setUpWrapper({ userProfile: { roles: { finance: 'Kabc' } } });
    const instance = shallowWrapper.instance();
    instance.handleChangeTab(event, 'phoenix');;
    expect(instance.state.selectedStatus).toBe('all');
  });

  it('should call verifyRedemption thunk when redemption is approved', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    instance.setState({
      filteredActivities: testRedemptions,
    });
    instance.handleClick('approved', redemption.id);
    expect(verifyRedemption).toHaveBeenCalled();
  });

  it('should call completeRedemptionFinance thunk when redemption is completed', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    instance.setState({
      filteredActivities: testRedemptions,
    });
    instance.handleClick('completed', redemption.id);
    expect(completeRedemptionFinance).toBeCalledWith(redemption.id, 'completed');
  });
  
  it('should return null the default case when handleClick is invoked with no click action', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    const result = instance.handleClick();
    expect(result).toBeNull();
  });

  it('should set selectedRedemption when redemption is clicked', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    instance.setState({
      filteredActivities: testRedemptions,
    });
    instance.handleClick(EDIT, redemption.id);
    expect(instance.state.selectedRedemption.id).toBe(redemption.id);
  });

  it('should clear selected redemption', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    instance.setState({
      selectedRedemption: redemption,
    });
    instance.deselectRedemption();
    expect(instance.state.selectedRedemption.id).toBe(undefined);
  });

  it('should selected redemption in state when reject button is clicked', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    instance.setState({
      filteredActivities: testRedemptions,
    });
    instance.handleClick('rejected', redemption.id);
    expect(instance.state.selectedRedemption.id).toBe(redemption.id);
  });

  it('should update selected redemption', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    const update = {
      center: 'Kigali',
      points: '8000',
      reason: 'Wanna go to Minnesota but ...',
    };
    instance.setState({
      selectedRedemption: redemption,
    });
    instance.updateSelectedRedemption(update);
    expect(instance.state.selectedRedemption.value).toBe(update.points);
  });

  it('should return redemptions that match the societyName in props when role is society president', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    const societyRedemptions = instance.getSocietyRedemptions();
    // filter redemptions by societyName
    const filterRes = redemptions.filter(redemption => redemption.society.name === testProps.societyName);
    expect(societyRedemptions).toEqual(filterRes);
  });

  it('should return redemptions that match the selected state when role is of SUCCESS_OPS', () => {
    const { shallowWrapper } = setUpWrapper({ userProfile: { roles: { cio: 'Kabc' } } });
    const instance = shallowWrapper.instance();
    instance.setState({ selectedSociety: 'istelle' });
    const filterRes = redemptions.filter(redemption => redemption.society.name === 'istelle');
    const societyRedemptions = instance.getSocietyRedemptions();
    expect(societyRedemptions).toEqual(filterRes);
  });

  it('should call componentDidUpdate and fetchRedemption', () => {
    const componentDidUpdateSpy = spy(Redemptions.WrappedComponent.prototype, 'componentDidUpdate');
    const { shallowWrapper } = setUpWrapper();
    shallowWrapper.setState({ userRoles: null });
    expect(componentDidUpdateSpy.called).toBeTruthy();
    expect(fetchRedemptionSpy.called).toBeTruthy();
  });
});
