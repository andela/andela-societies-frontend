import React from 'react';
import { shallow } from 'enzyme';

import { ApproveActivitiesContainer } from '../ApproveActivitiesContainer';

import ACTIVITY_STATUS from '../../../common/constants';
import activities from '../../../Dashboard/operations/tests/fixtures';
import { redemptions } from '../../../Redemptions/components/tests/fixtures';

describe('<ApproveActivitiesContainer />', () => {
  const props = {
    society: {
      phoenix: {
        usedPoints: 100,
        remainingPoints: 100,
        totalPoints: 200,
        activitiesLogged: activities.length,
        loggedActivities: activities,
        redemptions: [],
      },
      istelle: {
        usedPoints: 100,
        remainingPoints: 100,
        totalPoints: 200,
        activitiesLogged: activities.length,
        loggedActivities: activities,
        redemptions,
      }
    },
    fetchSocietyInfoRequest: jest.fn(),
    fetchSocietyRedemptionsRequest: jest.fn()
  };
  const shallowWrapper = shallow(<ApproveActivitiesContainer {...props} />);

  it('has a 1 ButtonComponent', () => {
    expect(shallowWrapper.find('ButtonComponent')).toHaveLength(1);
  });

  it('has TabsComponent', () => {
    expect(shallowWrapper.find('TabsComponent')).toHaveLength(1);
  });

  it('changes selectedSociety state when changeSelectedSociety is called with a society name', () => {
    const instance = shallowWrapper.instance();
    instance.setState({ selectedSociety: 'istelle' });
    instance.changeSelectedSociety('phoenix');
    expect(instance.state.selectedSociety).toEqual('phoenix');
  });

  it('returns activities with pending status', () => {
    const instance = shallowWrapper.instance();
    const pendingActivities = activities.filter(item => item.status === ACTIVITY_STATUS.PENDING);
    expect(instance.filterActivitiesByPendingStatus(activities)).toEqual(pendingActivities);
  });

  it('invokes fetchSocietyInfoRequest and fetchSocietyRedemptionsRequest when selectedSociety state change', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'fetchSocietyInfoRequest');
    const redemptionReqSpy = jest.spyOn(instance.props, 'fetchSocietyRedemptionsRequest');
    instance.setState({ selectedSociety: 'phoenix' });
    expect(spy).toHaveBeenCalled();
    expect(redemptionReqSpy).toHaveBeenCalled();
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
});
