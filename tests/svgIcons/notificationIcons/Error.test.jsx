import React from 'react';
import { shallow } from 'enzyme';

import ErrorIcon from '../../../src/components/svgIcons/notificationIcons/Error';

describe('<ErrorIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ErrorIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
