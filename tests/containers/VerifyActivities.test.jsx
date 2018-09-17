// Third party libraries
import React from 'react';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import 'jest-localstorage-mock';

// Components
import VerifyActivities from '../../src/containers/VerifyActivities';

// Fixtures
import storeFixture from '../../src/fixtures/store';
import society from '../../src/fixtures/society';
import activity from '../../src/fixtures/activity';
import activities from '../../src/fixtures/activities';

// Helpers
import filterActivitiesByStatus from '../../src/helpers/filterActivitiesByStatus';

const store = createMockStore(storeFixture);
const history = { push: () => { }, location: { pathname: '' } };
const roles = ['success ops'];
const verifyActivitiesOpsSpy = spy();
const verifyActivitySpy = spy();
const fetchAllActivitiesSpy = spy();
const event = { preventDefault: () => { } };

describe('<VerifyActivities />', () => {
  const props = {
    history,
    fetchUserInfo: () => { },
    changePageTitle: () => { },
    fetchSocietyInfo: () => { },
    societyName: 'iStelle',
    allActivities: activities,
    societyActivities: society.loggedActivities,
    requesting: false,
    verifyActivitiesOps: verifyActivitiesOpsSpy,
    verifyActivity: verifyActivitySpy,
    fetchAllActivities: fetchAllActivitiesSpy,
    message: {},
  };

  const component = shallow(<VerifyActivities.WrappedComponent
    {...props}
  />);
  it('should render without crashing', () => {
    const wrapperProps = { ...props, userRoles: roles };
    const wrapper = mount.bind(
      null,
      <Provider store={store}>
        <MemoryRouter>
          <VerifyActivities.WrappedComponent {...wrapperProps} />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).not.toThrow();
  });

  it('should change state of isSelectAllChecked when you call handleSelectAllClick', () => {
    component.setState({ isSelectAllChecked: true });
    component.instance().handleSelectAllClick();
    expect(component.state().isSelectAllChecked).toBe(false);
  });

  it('should update state after deselecting an item using handleDeselectActivity', () => {
    const deselectedId = 'bnfad176-43cd-11e8-b3b9-9801a7ae0329';
    // select all activities in review
    component.instance().handleSelectAllClick();
    const { selectedActivities } = component.state();
    // deselect one activity
    component.instance().handleDeselectActivity(deselectedId);
    const selected = selectedActivities.filter(item => item.id !== deselectedId);
    expect(selectedActivities).toEqual(selected);
  });

  it('should call verifyActivitiesOps props when handleApproveAllClick is invoked', () => {
    const instance = component.instance();
    instance.handleApproveAllClick();
    expect(verifyActivitiesOpsSpy.called).toBeTruthy();
  });

  it('should have the <MasonryLayout /> layout when role is not successOps', () => {
    expect(component.find('MasonryLayout').length).toBe(1);
  });

  it('should render ErrorMessage component when activities are not passed down as props', () => {
    expect(component.find('MasonryLayout').dive().find('ErrorMessage').length).toBe(1);
  });

  it('should render Activity cards', () => {
    component.setState({ filteredActivities: activities });
    expect(component.find('MasonryLayout').dive().find('ActivityCard').length).toBe(4);
  });

  it('should have the <LinearLayout /> layout when role is successOps', () => {
    component.setProps({ userRoles: ['success ops'] });
    expect(component.find('LinearLayout').length).toBe(1);
  });

  it('should show loader when fetching', () => {
    component.setProps({ requesting: true });
    expect(component.find('Loader').length).toBe(1);
  });

  it('should change state of selectedSociety when handleChangeTab is called with a title', () => {
    component.instance().handleChangeTab(event, 'phoenix');
    expect(component.state().selectedSociety).toEqual('phoenix');
  });

  it('should call verifyActivity when handleClick is invoked without role as SUCCESS_OPS', () => {
    component.setProps({ userRoles: ['cio'] });
    const instance = component.instance();
    instance.handleClick('approved', '1234t645');
    expect(verifyActivitySpy.called).toBeTruthy();
  });

  it('should call verifyActivitiesOps when handleClick is invoked with role as SUCCESS_OPS', () => {
    component.setProps({ userRoles: roles });
    const instance = component.instance();
    instance.handleClick('approved', '1234t645');
    expect(verifyActivitiesOpsSpy.called).toBeTruthy();
  });

  it('should call verifyActivity when handleClick is invoked with reject action and role as society secretary', () => {
    component.setProps({ userRoles: ['society secretary'] });
    const instance = component.instance();
    instance.handleClick('rejected', '1234t645');
    expect(verifyActivitySpy.called).toBeTruthy();
  });

  it('should return null the default case when handleClick is invoked with no click action', () => {
    const instance = component.instance();
    const result = instance.handleClick();
    expect(result).toBeNull();
  });

  it('should change state of selectedActivity to {} when deselectActivity is invoked ', () => {
    component.setProps({ userRoles: roles });
    const instance = component.instance();
    component.setState({ selectedActivity: activity });
    instance.deselectActivity();
    expect(component.state().selectedActivity).toEqual({});
  });
  it('should call componentDidUpdate and fetchAllActivities', () => {
    const componentDidUpdateSpy = spy(VerifyActivities.WrappedComponent.prototype, 'componentDidUpdate');
    component.setProps({ userRoles: [] });
    expect(componentDidUpdateSpy.called).toBeTruthy();
    expect(fetchAllActivitiesSpy.called).toBeTruthy();
  });
  it('should filter activities by status when handleChangeTab is clicked', () => {
    const selectedSocietyActivities = filterActivitiesByStatus(activities, 'pending')
      .filter(activityItem => activityItem.society.name === 'sparks');
    component.instance().handleChangeTab(event, 'sparks');
    expect(component.state().filteredActivities).toEqual(selectedSocietyActivities);
  });
});
