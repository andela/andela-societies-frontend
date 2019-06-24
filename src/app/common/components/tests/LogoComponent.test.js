import React from 'react';
import { shallow } from 'enzyme';
import LogoComponent from '../LogoComponent';

describe('<LogoComponent />', () => {
  const shallowWrapper = shallow(<LogoComponent />);

  it('should have the title text Societies', () => {
    expect(shallowWrapper.find('.logo__text').html()).toContain('Societies');
  });
});
