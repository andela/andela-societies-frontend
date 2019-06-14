import React from 'react';
import { shallow } from 'enzyme';
import HeroComponent from '../HeroComponent';

describe('<HeroComponent />', () => {
  const shallowWrapper = shallow(<HeroComponent />);

  it('should have hero class', () => {
    expect(shallowWrapper.find('.hero')).toHaveLength(1);
  });
});
