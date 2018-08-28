import React from 'react';
import { shallow } from 'enzyme';
import TextContent from '../../src/common/TextContent';

describe('<TextContent />', () => {
  const props = {
    name: 'center',
    content: 'Nairobi',
  };

  const wrapper = shallow(<TextContent {...props} />);

  it('should render without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should the corrent name string', () => {
    expect(wrapper.find('.formField__label--text-display').text()).toContain('Center');
  });
});
