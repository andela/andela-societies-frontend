import React from 'react';
import { shallow } from 'enzyme';

import RedemptionsIcon from './Redemptions';

describe('<RedemptionsIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RedemptionsIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
