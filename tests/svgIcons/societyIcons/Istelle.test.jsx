import React from 'react';
import { shallow } from 'enzyme';

import IstelleIcon from '../../../src/components/svgIcons/societyIcons/Istelle';

describe('<IstelleIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<IstelleIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});
