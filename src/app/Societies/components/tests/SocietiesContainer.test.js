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
      }
    },
    fetchSocietyInfoRequest: jest.fn(),
    fetchSocietyRedemptionsRequest: jest.fn()
  };
  const shallowWrapper = shallow(<SocietiesContainer {...props} />);

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
});
