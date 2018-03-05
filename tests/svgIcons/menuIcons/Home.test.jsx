import React from 'react';
import { shallow } from 'enzyme';

import HomeIcon from '../../../src/components/svgIcons/menuIcons/Home';

describe('<HomeIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<HomeIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
