import React from 'react';
import { shallow } from 'enzyme';

import Tabs from '../../../src/components/header/Tabs';
import tabs from '../../../src/fixtures/tabs';

const handleChangeTab = jest.fn();
const event = { preventDefault: () => {} };

describe('<Tabs />', () => {
  let shallowWrapper;
  beforeEach((() => {
    shallowWrapper = shallow(<Tabs tabTitles={tabs} selectedTab='phoenix' handleChangeTab={handleChangeTab} />);
    jest.spyOn(event, 'preventDefault');
  }));
  it('should render tabs', () => {
    expect(shallowWrapper.find('.tabs').length).toBe(1);
    expect(shallowWrapper.find('.tabs__tab-title').length).toBe(4);
  });

  it('should set correct active tab', () => {
    expect(shallowWrapper.find('.tabs__tab-title--active').html()).toContain('Phoenix');
  });

  it('should call handleChangeTab when a tab is clicked', () => {
    shallowWrapper.childAt(0).simulate('click');
    expect(handleChangeTab.mock.calls.length).toEqual(1);
  });
});
