import React from 'react';
import { shallow } from 'enzyme';

import InvictusIcon from './Invictus';

describe('<InvictusIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<InvictusIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
