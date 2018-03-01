import React from 'react';
import { shallow } from 'enzyme';

import MyActivitiesIcon from '../../../src/components/svgIcons/menuIcons/MyActivities';

describe('<MyActivitiesIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<MyActivitiesIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
