import React from 'react';
import { shallow } from 'enzyme';
import { HomeComponent } from '../HomeComponent';

const props = {
  closeModalHandler: jest.fn(),
};

describe('<HomeComponent />', () => {
  const shallowWrapper = shallow(<HomeComponent {...props} />);

  it('should contain text in h1 tag', () => {
    expect(shallowWrapper.find('.home__title').html()).toContain('Dashboard');
  });

  it('should call the closeModalHadler', () => {
    shallowWrapper.find('.back-drop').simulate('click');
  });
});
