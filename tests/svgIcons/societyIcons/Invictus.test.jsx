import React from 'react';
import { shallow } from 'enzyme';

import InvictusIcon from '../../../src/components/svgIcons/societyIcons/Invictus';

describe('<InvictusIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<InvictusIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
