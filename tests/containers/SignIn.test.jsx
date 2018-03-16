import React from 'react';
import { mount, shallow } from 'enzyme';
import localStorage from 'mock-local-storage';

import SignIn from '../../src/containers/SignIn';
import VerifyActivitiesIcon from '../../src/components/svgIcons/menuIcons/VerifyActivities';
import RedemptionIcon from '../../src/components/svgIcons/menuIcons/Redemptions';
import SocietiesIcon from '../../src/components/svgIcons/menuIcons/Societies';
import LogActivitiesIcon from '../../src/components/svgIcons/menuIcons/LogActivities';

global.window = {};
window.localStorage = global.localStorage;

describe('<SignIn />', () => {
  let wrapper;
  beforeEach(() => {
    const history = { push: () => { } };
    wrapper = mount(<SignIn.WrappedComponent history={history} />);
  });

  it('should render successfully', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should have initial state property signInError as false', () => {
    expect(wrapper.instance().state).toHaveProperty('signInError', false);
  });

  it('should display signInError notification when signInError is true', () => {
    const history = { push: () => { } };
    wrapper = shallow(<SignIn.WrappedComponent history={history} />);
    wrapper.setState({ signInError: true });
    expect(wrapper.render().find('.signInError').length).toBe(1);
  });

  it('should render a signin button', () => {
    expect(wrapper.find('.signInButton').length).toBe(1);
  });

  it('should render feature icons', () => {
    expect(wrapper.find(VerifyActivitiesIcon).length).toBe(1);
    expect(wrapper.find(RedemptionIcon).length).toBe(1);
    expect(wrapper.find(SocietiesIcon).length).toBe(1);
    expect(wrapper.find(LogActivitiesIcon).length).toBe(1);
  });
});
