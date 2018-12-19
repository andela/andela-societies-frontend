import React from 'react';
import { shallow } from 'enzyme';
import HomeComponent from '../HomeComponent';

describe('<HomeComponent />', () => {
  const shallowWrapper = shallow(<HomeComponent />);

  it('should contain text in h1 tag', () => {
    expect(shallowWrapper.find('.home__title').html()).toContain('Welcome to Andela Societies');
  });
});
