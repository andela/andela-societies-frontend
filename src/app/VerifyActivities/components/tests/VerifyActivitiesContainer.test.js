import React from 'react';
import { shallow } from 'enzyme';

import { VerifyActivitiesContainer } from '../VerifyActivitiesContainer';

import activities from '../../../Dashboard/operations/tests/fixtures';
import ACTIVITY_STATUS from '../../../common/constants';

describe('<VerifyActivitiesContainer />', () => {
  const props = {
    societyName: 'phoenix',
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
      },
    },
    fetchSocietyInfoRequest: jest.fn(),
    fetchUserActivites: jest.fn(),
    verifyActivity: jest.fn(),
  };
  const shallowWrapper = shallow(<VerifyActivitiesContainer {...props} />);

  it('has a 2 ButtonComponents', () => {
    expect(shallowWrapper.find('ButtonComponent')).toHaveLength(2);
  });

  it('has VerifyActivitiesComponent', () => {
    expect(shallowWrapper.find('VerifyActivitiesComponent')).toHaveLength(1);
  });

  it('has SocietyStatsComponent', () => {
    expect(shallowWrapper.find('SocietyStatsComponent')).toHaveLength(1);
  });

  it('returns activities with in review status', () => {
    const instance = shallowWrapper.instance();
    const inReviewActivities = activities.filter(item => item.status === ACTIVITY_STATUS.IN_REVIEW);
    expect(instance.filterActivitiesByInReviewStatus(activities)).toEqual(inReviewActivities);
  });

  it('should handleVerify', () => {
    const instance = shallowWrapper.instance();
    const data = {
      loggedActivityId: 1234567,
      status: 'rejected',
    };
    instance.setState(data);
    const spy = jest.spyOn(instance.props, 'verifyActivity');
    instance.handleVerify();
    expect(spy).toHaveBeenCalled();
  });

  it('invokes fetchSocietyInfoRequest in componentDidUpdate when societyName props change', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'fetchSocietyInfoRequest');
    shallowWrapper.setProps({ societyName: 'istelle' });
    expect(spy).toHaveBeenCalled();
  });

  it('should open the Log Points Modal', () => {
    const instance = shallowWrapper.instance();
    instance.setState({ logPoints: false });
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
});
