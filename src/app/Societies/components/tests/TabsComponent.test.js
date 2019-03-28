import React from 'react';
import { shallow } from 'enzyme';

import TabsComponent from '../TabsComponent';

describe('<TabsComponent />', () => {
  const setUpWrapper = ({
    selectedTab = 'activities',
  } = {}) => {
    const props = {
      selectedTab,
      changeSelectedTab: jest.fn(),
    };
    const shallowWrapper = shallow(<TabsComponent {...props} />);
    return {
      shallowWrapper,
    };
  };

  it('has the class selected__title with Activities text ', () => {
    const { shallowWrapper } = setUpWrapper();
    expect(shallowWrapper.find('.selected__title').html()).toContain('Activities');
  });

  it('have the class society__tabs', () => {
    const { shallowWrapper } = setUpWrapper({ societyActivities: [] });
    expect(shallowWrapper.find('.society__tabs')).toHaveLength(1);
  });

  it('has the class selected__title with Redemptions text ', () => {
    const { shallowWrapper } = setUpWrapper({ selectedTab: 'redemptions' });
    expect(shallowWrapper.find('.selected__title').html()).toContain('Redemptions');
  });
});
