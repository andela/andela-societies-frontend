import React from 'react';
import { mount, shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import MyActivities from '../../src/containers/MyActivities';
import storeFixture from '../../src/fixtures/store';
import activities from '../../src/fixtures/activities';
import activity from '../../src/fixtures/activity';

import clickActions from '../../src/constants/clickAction';

const { EDIT } = clickActions;

const store = createMockStore(storeFixture);
const history = { push: () => { } };
const fetchUserInfo = jest.fn();
const changePageTitle = jest.fn();
const fetchMyActivities = jest.fn();
const fetchCategories = jest.fn();

const mounted = mount.bind(
  null,
  <Provider store={store}>
    <MemoryRouter>
      <MyActivities
        history={history}
        fetchUserInfo={fetchUserInfo}
        changePageTitle={changePageTitle}
        fetchMyActivities={fetchMyActivities}
      />
    </MemoryRouter>
  </Provider>,
);

const setUpWrapper = ({
  requesting = false,
} = {}) => {
  const props = {
    requesting,
    history,
    fetchUserInfo,
    changePageTitle,
    fetchMyActivities,
  };
  return mount.bind((
    <Provider store={store}>
      <MemoryRouter>
        <MyActivities.WrappedComponent {...props} />
      </MemoryRouter>
    </Provider>
  ));
};
let shallowWrapper;

describe('<MyActivities />', () => {
  beforeEach(() => {
    shallowWrapper = shallow(<MyActivities.WrappedComponent
      history={history}
      fetchUserInfo={fetchUserInfo}
      changePageTitle={changePageTitle}
      fetchMyActivities={fetchMyActivities}
      fetchCategories={fetchCategories}
      categories={[]}
    />);
  });

  it('should render without crashing', () => {
    expect(setUpWrapper).not.toThrow();
  });

  it('should render PageHeader', () => {
    expect(shallowWrapper.find('PageHeader').length).toBe(1);
  });

  it('should render loader when requesting activities', () => {
    shallowWrapper.setProps({ requesting: true });
    expect(shallowWrapper.find('Loader').length).toBe(1);
  });

  it('should render MasonryLayout', () => {
    expect(shallowWrapper.find('MasonryLayout').length).toBe(1);
  });

  it('should render ActivityCards', () => {
    const mountedWrapper = mounted();
    mountedWrapper.setState({ allActivities: activities, filteredActivities: activities, requesting: false });
    expect(mountedWrapper.state().allActivities).toEqual(activities);
  });

  it('should filter activity given status', () => {
    const instance = shallowWrapper.instance();
    instance.setState({
      allActivities: activities,
      filteredActivities: activities,
    });
    jest.spyOn(instance, 'filterActivities');
    expect(instance.state.selectedStatus).toBe('All');
    expect(instance.state.filteredActivities.length).toBe(4);
  });

  it('should not filter activities if given status is All', () => {
    const instance = shallowWrapper.instance();
    instance.setState({
      allActivities: activities,
      filteredActivities: activities,
    });
    expect(instance.state.selectedStatus).toBe('All');
    expect(instance.state.filteredActivities.length).toBe(activities.length);
  });

  it('should open modal and set selectedActivity when activity is clicked', () => {
    const instance = shallowWrapper.instance();
    instance.setState({
      filteredActivities: activities,
      selectedActivity: activity,
      showModal: true,
    });
    instance.handleClick(EDIT, activity.id);
    expect(instance.state.showModal).toBe(true);
  });

  it('should close modal and clear selected activity', () => {
    const instance = shallowWrapper.instance();
    instance.setState({
      selectedActivity: activity,
    });
    instance.deselectActivity();
    expect(instance.state.selectedActivity.id).toBe(undefined);
    expect(instance.state.showModal).toBe(false);
  });

  it('should update selected activity', () => {
    const instance = shallowWrapper.instance();
    const update = {
      id: '7387721305415687',
      category: 'Participating in a tech event',
      date: 'November 3, 2017',
      description: 'Chitchat',
      points: 250,
      status: 'default',
    };
    instance.setState({
      selectedActivity: activity,
    });
    instance.updateSelectedActivity(update);
    expect(instance.state.selectedActivity.description).toBe(update.description);
  });
});
