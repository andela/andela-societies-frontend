import React from 'react';
import { shallow } from 'enzyme';

import { SocietyActivitiesContainer } from '../SocietyActivitiesContainer';

import ACTIVITY_STATUS from '../../../common/constants';
import activities from '../../../Dashboard/operations/tests/fixtures';
import { redemptions } from '../../../Redemptions/components/tests/fixtures';

describe('<SocietyActivitiesContainer />', () => {
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
      },
    },
    fetchSocietyInfoRequest: jest.fn(),
    fetchSocietyRedemptionsRequest: jest.fn(),
    approveActivity: jest.fn(),
    rejectActivity: jest.fn(),
    resetApproveActivityStatus: jest.fn(),
    resetRejectActivityStatus: jest.fn(),
  };
  const shallowWrapper = shallow(<SocietyActivitiesContainer {...props} />);

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

  it('should approve a logged activity', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'approveActivity');
    instance.handleApproveOrRejectClick('1', 'approved');
    expect(spy).toHaveBeenCalled();
  });

  it('should reject a logged activity', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'rejectActivity');
    instance.handleApproveOrRejectClick('2', 'iStelle');
    expect(spy).toHaveBeenCalled();
  });

  it('invokes toggleAlertDialogOpen when status prop changes state change', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance, 'toggleAlertDialogOpen');
    shallowWrapper.setProps({ status: 'approved' });
    expect(spy).toHaveBeenCalled();
  });

  it('changes alertDialogOpen state when toggleAlertDialogOpen is called with a boolean value', () => {
    const instance = shallowWrapper.instance();
    instance.setState({ alertDialogOpen: true });
    instance.toggleAlertDialogOpen(false);
    expect(instance.state.alertDialogOpen).toBeFalsy();
  });

  it('invokes resetApproveActivityStatus when handleAlertDialogClose is called', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'resetApproveActivityStatus');
    instance.handleAlertDialogClose();

    expect(spy).toHaveBeenCalled();
  });

  it('invokes resetRejectActivityStatus when handleAlertDialogClose is called', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'resetRejectActivityStatus');
    instance.handleAlertDialogClose();

    expect(spy).toHaveBeenCalled();
  });
});
