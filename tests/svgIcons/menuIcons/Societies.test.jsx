import React from 'react';
import { shallow } from 'enzyme';

import SocietiesIcon from '../../../src/components/svgIcons/menuIcons/Societies';

describe('<SocietiesIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SocietiesIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
