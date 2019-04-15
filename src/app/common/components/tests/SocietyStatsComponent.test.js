import React from 'react';
import { shallow } from 'enzyme';
import SocietyStatsComponent from '../SocietyStatsComponent';

describe('<SocietyStatsComponent />', () => {
  const props = {
    usedPoints: 0,
    remainingPoints: 0,
    totalPoints: 200,
    activitiesLogged: 4
  }
  const shallowWrapper = shallow(<SocietyStatsComponent {...props} />);

  it('should contain Total Remaining Points text', () => {
    expect(shallowWrapper.find('#society-stats__desc--remaining-points').html()).toContain('Total Remaining Points');
  });

  it('should contain Activities when there is totalPoints and activitiesLogged props', () => {
    expect(shallowWrapper.find('#activities-logged').html()).toContain('Activities');
  });

  it('should contain Total Points Earned text when there is totalPoints and activitiesLogged props', () => {
    expect(shallowWrapper.find('.society-stats__separator')).toHaveLength(1);
  });
});
