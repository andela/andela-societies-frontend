import React from 'react';
import { shallow } from 'enzyme';
import SocietyStatsComponent from '../SocietyStatsComponent';

describe('<SocietyStatsComponent />', () => {
  const props = {
    usedPoints: 0,
    remainingPoints: 0,
  }
  const shallowWrapper = shallow(<SocietyStatsComponent {...props} />);

  it('should contain Total Remaining Points text', () => {
    expect(shallowWrapper.find('#society-stats__desc--remaining-points').html()).toContain('Total Remaining Points');
  });
});
