import React from 'react';
import { mount } from 'enzyme';

import TabsComponent, { getTabBorderClassname, TABS } from '../TabsComponent';

describe('<TabsComponent />', () => {
  const setUpWrapper = ({ selectedTab = 'activities', tabNames = ['activities', 'redemptions'] } = {}) => {
    const props = {
      selectedTab,
      tabNames,
      changeSelectedTab: jest.fn(),
    };
    return mount(<TabsComponent {...props} />);
  };

  it('has the class selected__title with Activities text ', () => {
    const shallowWrapper = setUpWrapper();
    expect(shallowWrapper.find('.selected__title').html()).toContain('Activities');
  });

  it('have the class name tabs', () => {
    const shallowWrapper = setUpWrapper();
    expect(shallowWrapper.find('.tabs')).toHaveLength(1);
  });

  it('has the class selected__title with Redemptions text ', () => {
    const shallowWrapper = setUpWrapper({ selectedTab: 'redemptions' });
    expect(shallowWrapper.find('.selected__title').html()).toContain('Redemptions');
  });

  it('returns tab border classname ', () => {
    const redemptionsClass = getTabBorderClassname('redemptions');
    const invictusClass = getTabBorderClassname('invictus');
    const phoenixClass = getTabBorderClassname('phoenix');
    const sparksClass = getTabBorderClassname('sparks');
    expect(redemptionsClass).toEqual(`tab__selected--${TABS[1]}`);
    expect(invictusClass).toEqual(`tab__selected--${TABS[2]}`);
    expect(phoenixClass).toEqual(`tab__selected--${TABS[3]}`);
    expect(sparksClass).toEqual(`tab__selected--${TABS[4]}`);
  });

  it('calls changeSelectedTab when selected__title is clicked ', () => {
    const shallowWrapper = setUpWrapper();
    const spy = jest.spyOn(shallowWrapper.props(), 'changeSelectedTab');
    shallowWrapper.find('.selected__title').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
