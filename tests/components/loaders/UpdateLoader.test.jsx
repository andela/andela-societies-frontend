import React from 'react';
import { shallow } from 'enzyme';

// components
import UpdateLoader from '../../../src/components/loaders/UpdateLoader';

const wrapper = shallow(<UpdateLoader />);

describe('<UpdateLoader />', () => {
  it('should render the update loader', () => {
    expect(wrapper.find('.update').length).toBe(1);
  });
});
