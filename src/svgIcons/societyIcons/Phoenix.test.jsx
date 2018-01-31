import React from 'react';
import { shallow } from 'enzyme';

import PhoenixIcon from './Phoenix';

describe('<PhoenixIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PhoenixIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
