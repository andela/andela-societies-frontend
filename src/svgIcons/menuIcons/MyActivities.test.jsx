import React from 'react';
import { shallow } from 'enzyme';

import MyActivitiesIcon from './MyActivities';

describe('<MyActivitiesIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<MyActivitiesIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
