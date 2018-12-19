import React from 'react';
import { shallow } from 'enzyme';
import HomeComponent from '../HomeComponent';

describe('<HomeComponent />', () => {
  const shallowWrapper = shallow(<HomeComponent />);

  it('should contain h1 tag', () => {
    expect(shallowWrapper.find('.home__title').length).toBe(1);
  });
});
