import React from 'react';
import { shallow } from 'enzyme';

import Globe from '../../../src/components/svgIcons/activityIcons/Globe';

describe('<Globe />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Globe />);
    expect(wrapper).toMatchSnapshot();
  });
});
