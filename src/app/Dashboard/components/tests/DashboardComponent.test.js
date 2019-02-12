import React from 'react';
import { shallow } from 'enzyme';
import DashboardComponent from '../DashboardComponent';

describe('<DashboardComponent />', () => {
  const shallowWrapper = shallow(<DashboardComponent />);

  it('should contain My Activities text', () => {
    expect(shallowWrapper.find('.user-dashboard__title').html()).toContain('My Activities');
  });
});
