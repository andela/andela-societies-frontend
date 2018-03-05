import React from 'react';
import { shallow } from 'enzyme';

import SparksIcon from '../../../src/components/svgIcons/societyIcons/Sparks';

describe('<SparksIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SparksIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
