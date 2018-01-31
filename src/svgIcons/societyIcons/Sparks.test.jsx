import React from 'react';
import { shallow } from 'enzyme';

import SparksIcon from './Sparks';

describe('<SparksIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SparksIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
