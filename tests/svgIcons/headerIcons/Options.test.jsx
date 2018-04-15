import React from 'react';
import { shallow } from 'enzyme';

import OptionsIcon from '../../../src/components/svgIcons/headerIcons/Options';

describe('<OptionsIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<OptionsIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
