import React from 'react';
import { shallow } from 'enzyme';
import MyStatsComponent from '../MyStatsComponent';

describe('<MyStatsComponent />', () => {
  const props = {
    points: 0,
    activities: 0,
  }

  const shallowWrapper = shallow(<MyStatsComponent {...props} />);

  it('should contain Points subscript text', () => {
    expect(shallowWrapper.find('.stats__description--footer--subsc').html()).toContain('Points');
  });
});
