import React from 'react';
import { shallow } from 'enzyme';

import Delete from '../../../src/components/svgIcons/categoryIcons/Delete';

describe('<Delete />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Delete />);
    expect(wrapper).toMatchSnapshot();
  });
});
