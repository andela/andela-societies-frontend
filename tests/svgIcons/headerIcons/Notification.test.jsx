import React from 'react';
import { shallow } from 'enzyme';

import NotificationIcon from '../../../src/components/svgIcons/headerIcons/Notification';

describe('<NotificationIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<NotificationIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
