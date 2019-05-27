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
        redemptions: []
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
    shallowWrapper.setProps({ match: { params: { society: 'istelle' }} });
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
});
