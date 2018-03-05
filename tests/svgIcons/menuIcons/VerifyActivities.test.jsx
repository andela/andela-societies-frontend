import React from 'react';
import { shallow } from 'enzyme';

import VerifyActivitiesIcon from '../../../src/components/svgIcons/menuIcons/VerifyActivities';

describe('<VerifyActivitiesIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<VerifyActivitiesIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
