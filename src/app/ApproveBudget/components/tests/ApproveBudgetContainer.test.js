import React from 'react';
import { shallow } from 'enzyme';

import { ApproveBudgetContainer } from '../ApproveBudgetContainer';

import ACTIVITY_STATUS from '../../../common/constants';
import activities from '../../../Dashboard/operations/tests/fixtures';
import { redemptions } from '../../../Redemptions/components/tests/fixtures';

describe('<ApproveBudgetContainer />', () => {
  const props = {
    status: null,
    society: {
      approveBudgetStatus: null,
      approveBudgetMessage: null,
      phoenix: {
        usedPoints: 100,
        remainingPoints: 100,
        totalPoints: 200,
        activitiesLogged: activities.length,
        redemptions: [],
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
    approveBudget: jest.fn(),
    resetApproveBugetStatus: jest.fn(),
    fetchSocietyInfoRequest: jest.fn(),
    fetchSocietyRedemptionsRequest: jest.fn(),
  };
  const shallowWrapper = shallow(<ApproveBudgetContainer {...props} />);

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

  it('returns redemptions with pending status', () => {
    const instance = shallowWrapper.instance();
    const pendingRedemptions = redemptions.filter(item => item.status === ACTIVITY_STATUS.PENDING);
    expect(instance.filterRedemptionsByPendingStatus(redemptions)).toEqual(pendingRedemptions);
  });

  it('invokes fetchSocietyRedemptionsRequest when selectedSociety state change', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'fetchSocietyRedemptionsRequest');
    instance.setState({ selectedSociety: 'phoenix' });
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

  it('invokes resetApproveBugetStatus when handleAlertDialogClose is called', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'resetApproveBugetStatus');
    instance.handleAlertDialogClose();
    expect(spy).toHaveBeenCalled();
  });

  it('invokes approveBudget when handleApproveOrRejectClick is called', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'approveBudget');
    instance.handleApproveOrRejectClick('2', 'approved');
    expect(spy).toHaveBeenCalled();
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
