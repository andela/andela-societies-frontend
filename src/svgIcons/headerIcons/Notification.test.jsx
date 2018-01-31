import React from 'react';
import { shallow } from 'enzyme';

import NotificationIcon from './Notification';

describe('<NotificationIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<NotificationIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
