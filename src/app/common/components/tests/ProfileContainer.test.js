import React from 'react';
import { shallow } from 'enzyme';
import ProfileContainer from '../ProfileContainer';

describe('<ProfileContainer />', () => {
  const props = {
    name:'User test',
    userImage:'sidebar_nav-icon',
  }
  const shallowWrapper = shallow(<ProfileContainer {...props} />);

  it('should display name passed as prop', () => {
    expect(shallowWrapper.find('.profile__name').text()).toEqual('User test');
  });

  it('toggles showProfile state when profile image section is clicked', () => {
    shallowWrapper.setState({ showProfile: true });
    shallowWrapper.find('.profile__content').simulate('click')
    expect(shallowWrapper.state().showProfile).toBeFalsy();
  });

  it('toggles showProfile state when logout is invoked ', () => {
    shallowWrapper.setState({ showProfile: true });
    const instance = shallowWrapper.instance();
    instance.logOut();
    expect(shallowWrapper.state().showProfile).toBeFalsy();
  });
});
