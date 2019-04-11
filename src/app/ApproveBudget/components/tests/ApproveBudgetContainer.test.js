import React from 'react';
import { shallow } from 'enzyme';

import { ApproveBudgetContainer } from '../ApproveBudgetContainer';

import ACTIVITY_STATUS from '../../../common/constants';
import activities from '../../../Dashboard/operations/tests/fixtures';
import { redemptions } from '../../../Redemptions/components/tests/fixtures';

describe('<ApproveBudgetContainer />', () => {
  const props = {
    society: {
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
        redemptions: []
      }
    },
    fetchSocietyInfoRequest: jest.fn(),
    fetchSocietyRedemptionsRequest: jest.fn()
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
});
