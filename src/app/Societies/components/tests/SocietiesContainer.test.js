import React from 'react';
import { shallow } from 'enzyme';

import { SocietiesContainer } from '../SocietiesContainer';

import activities from '../../../Dashboard/operations/tests/fixtures';

describe('<SocietiesContainer />', () => {
  const props = {
    match: {
      params: {
        society: 'phoenix',
      },
    },
    society: {
      phoenix: {
        usedPoints: 100,
        remainingPoints: 100,
        totalPoints: 200,
        activitiesLogged: activities.length,
        loggedActivities: activities,
      },
      istelle: {
        usedPoints: 100,
        remainingPoints: 100,
        totalPoints: 200,
        activitiesLogged: activities.length,
        loggedActivities: activities,
        redemptions: [],
      },
    },
    fetchSocietyInfoRequest: jest.fn(),
    fetchSocietyRedemptionsRequest: jest.fn(),
  };

  let shallowWrapper;
  beforeEach(() => {
    shallowWrapper = shallow(<SocietiesContainer {...props} />);
  });

  afterEach(() => {
    shallowWrapper.unmount();
  });

  it('has a 2 ButtonComponents', () => {
    expect(shallowWrapper.find('ButtonComponent')).toHaveLength(2);
  });

  it('has TabsComponent', () => {
    expect(shallowWrapper.find('TabsComponent')).toHaveLength(1);
  });

  it('changes selectedTab state when changeSelectedTab is called with a society name', () => {
    const instance = shallowWrapper.instance();
    instance.setState({ selectedTab: 'tab' });
    instance.changeSelectedTab('activities');
    expect(instance.state.selectedTab).toEqual('activities');
  });

  it('invokes fetchSocietyInfoRequest when society props change', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'fetchSocietyInfoRequest');
    shallowWrapper.setProps({ match: { params: { society: 'istelle' } } });
    expect(spy).toHaveBeenCalled();
  });

  it('should open the Log Points Modal', () => {
    const instance = shallowWrapper.instance();
    expect(instance.state.logPoints).toBe(false);
    shallowWrapper.find('.button__add').simulate('click');
    expect(instance.state.logPoints).toBe(true);
  });

  it('should handle pagination click', () => {
    const instance = shallowWrapper.instance();
    const data = { selected: 0 };
    instance.setState({
      currentPage: data.selected + 1,
    });
    instance.handlePageClick(data);
    expect(instance.state.currentPage).toBe(1);
  });

  it('should show the filter drop down', () => {
    const instance = shallowWrapper.instance();

    instance.showFilter();
    expect(instance.state.showFilterDropdown).toEqual(true);

    shallowWrapper.unmount();
  });

  it('should hide the filter drop down', () => {
    const instance = shallowWrapper.instance();
    const event = {
      target: {
        className: 'button__filter',
      },
    };

    instance.hideFilter(event);
    expect(instance.state.showFilterDropdown).toEqual(false);
  });

  it('should hide the filter drop down', () => {
    const instance = shallowWrapper.instance();
    const event = {
      target: {
        current: '<span>Filter</span>',
      },
    };

    instance.hideFilter(event);
    expect(instance.state.showFilterDropdown).toEqual(false);
  });

  it('should select all when the first filter index is true', () => {
    const instance = shallowWrapper.instance();
    const event = {
      target: {
        value: 'select all',
        checked: true,
      },
    };

    const filterBy = [
      { name: 'select all', checked: false },
      { name: 'approved', checked: false },
      { name: 'in review', checked: false },
      { name: 'rejected', checked: false },
      { name: 'pending', checked: false },
    ];

    instance.setState({
      filterBy,
    });

    instance.handleClick(0)(event);
    expect(instance.state.filterBy[0].checked).toEqual(true);
    expect(instance.state.filterBy[1].checked).toEqual(true);
    expect(instance.state.filterBy[2].checked).toEqual(true);
    expect(instance.state.filterBy[3].checked).toEqual(true);
    expect(instance.state.filterBy[4].checked).toEqual(true);
  });

  it('should select a single checkbox', () => {
    const instance = shallowWrapper.instance();
    const event = {
      target: {
        value: 'select one',
        checked: true,
      },
    };

    const clcikNum = 0;

    const filterBy = [
      { name: 'select all', checked: false },
      { name: 'approved', checked: false },
      { name: 'in review', checked: false },
      { name: 'rejected', checked: false },
      { name: 'pending', checked: false },
    ];

    instance.setState({
      filterBy,
      clcikNum,
    });

    instance.handleClick(1)(event);
    expect(instance.state.filterBy[0].checked).toEqual(false);
    expect(instance.state.filterBy[1].checked).toEqual(true);
    expect(instance.state.filterBy[2].checked).toEqual(false);
    expect(instance.state.filterBy[3].checked).toEqual(false);
    expect(instance.state.filterBy[4].checked).toEqual(false);
  });

  it('should select another checkbox', () => {
    const instance = shallowWrapper.instance();
    const event = {
      target: {
        value: 'select one',
        checked: true,
      },
    };

    const clcikNum = 1;

    const filterBy = [
      { name: 'select all', checked: false },
      { name: 'approved', checked: true },
      { name: 'in review', checked: false },
      { name: 'rejected', checked: false },
      { name: 'pending', checked: false },
    ];

    instance.setState({
      filterBy,
      clcikNum,
    });

    instance.handleClick(2)(event);
    expect(instance.state.filterBy[0].checked).toEqual(false);
    expect(instance.state.filterBy[1].checked).toEqual(true);
    expect(instance.state.filterBy[2].checked).toEqual(true);
    expect(instance.state.filterBy[3].checked).toEqual(false);
    expect(instance.state.filterBy[4].checked).toEqual(false);
  });

  it('should uncheck one checkbox', () => {
    const instance = shallowWrapper.instance();
    const event = {
      target: {
        value: 'select one',
        checked: false,
      },
    };

    const clcikNum = 2;

    const filterBy = [
      { name: 'select all', checked: false },
      { name: 'approved', checked: true },
      { name: 'in review', checked: true },
      { name: 'rejected', checked: false },
      { name: 'pending', checked: false },
    ];

    instance.setState({
      filterBy,
      clcikNum,
    });

    instance.handleClick(2)(event);
    expect(instance.state.filterBy[0].checked).toEqual(false);
    expect(instance.state.filterBy[1].checked).toEqual(true);
    expect(instance.state.filterBy[2].checked).toEqual(false);
    expect(instance.state.filterBy[3].checked).toEqual(false);
    expect(instance.state.filterBy[4].checked).toEqual(false);
  });

  it('should uncheck another checkbox', () => {
    const instance = shallowWrapper.instance();
    const event = {
      target: {
        value: 'select one',
        checked: false,
      },
    };

    const clcikNum = 1;

    const filterBy = [
      { name: 'select all', checked: false },
      { name: 'approved', checked: true },
      { name: 'in review', checked: false },
      { name: 'rejected', checked: false },
      { name: 'pending', checked: false },
    ];

    instance.setState({
      filterBy,
      clcikNum,
    });

    instance.handleClick(1)(event);
    expect(instance.state.filterBy[0].checked).toEqual(false);
    expect(instance.state.filterBy[1].checked).toEqual(false);
    expect(instance.state.filterBy[2].checked).toEqual(false);
    expect(instance.state.filterBy[3].checked).toEqual(false);
    expect(instance.state.filterBy[4].checked).toEqual(false);

    expect(instance.state.filteredSocietyActivities.length).toEqual(4);
  });

  it('should uncheck the \'select all\' checkbox when any of the checkbox is unchecked', () => {
    const instance = shallowWrapper.instance();
    const event = {
      target: {
        value: 'select all',
        checked: true,
      },
    };

    const filterBy = [
      { name: 'select all', checked: false },
      { name: 'approved', checked: false },
      { name: 'in review', checked: false },
      { name: 'rejected', checked: false },
      { name: 'pending', checked: false },
    ];

    instance.setState({
      filterBy,
    });

    instance.handleClick(0)(event);
    expect(instance.state.filterBy[0].checked).toEqual(true);
    expect(instance.state.filterBy[1].checked).toEqual(true);
    expect(instance.state.filterBy[2].checked).toEqual(true);
    expect(instance.state.filterBy[3].checked).toEqual(true);
    expect(instance.state.filterBy[4].checked).toEqual(true);

    const eventTest = {
      target: {
        value: 'select all',
        checked: false,
      },
    };
    const filterByTest = [
      { name: 'select all', checked: true },
      { name: 'approved', checked: true },
      { name: 'in review', checked: true },
      { name: 'rejected', checked: false },
      { name: 'pending', checked: true },
    ];

    instance.setState({
      filterBy: filterByTest,
    });

    instance.handleClick(0)(eventTest);
    expect(instance.state.filterBy[0].checked).toEqual(false);
  });

  it('should return a true if all the checkboxes are all checked', () => {
    const instance = shallowWrapper.instance();
    const item = [
      { name: 'select all', checked: true },
      { name: 'approved', checked: true },
      { name: 'in review', checked: true },
      { name: 'rejected', checked: true },
      { name: 'pending', checked: true },
    ];

    const check = instance.isAllChecked(item);
    expect(check).toEqual(true);
  });

  it('should return a false if at least one the checkboxes is unchecked', () => {
    const instance = shallowWrapper.instance();
    const item = [
      { name: 'select all', checked: true },
      { name: 'approved', checked: true },
      { name: 'in review', checked: false },
      { name: 'rejected', checked: true },
      { name: 'pending', checked: true },
    ];

    const check = instance.isAllChecked(item);
    expect(check).toEqual(false);
  });
});
