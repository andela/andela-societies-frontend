import React from 'react';
import { shallow } from 'enzyme';

import CloseIcon from '../../../src/components/svgIcons/notificationIcons/Close';

describe('<CloseIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<CloseIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
