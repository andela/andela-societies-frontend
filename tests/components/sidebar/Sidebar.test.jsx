import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from '../../../src/components/sidebar/Sidebar';
import testProfile from '../../../src/fixtures/userProfile';
import pageInfo from '../../../src/helpers/pageInfo';
import Home from '../../../src/containers/Home';
import HomeIcon from '../../../src/components/svgIcons/menuIcons/Home';

const userProfile = { ...testProfile, roles: { 'society president': 'Kabc' } };
const testPageInfo = { ...pageInfo };
const testPage = {
  title: 'Test',
  url: '/u/',
  component: Home,
  menuIcon: HomeIcon,
};
testPageInfo.pages.push(testPage);

let mountWrapper;

describe('<Sidebar>', () => {
  beforeEach(() => {
    mountWrapper = mount((
      <MemoryRouter>
        <Sidebar userRoles={Object.keys(userProfile.roles)} pageInfo={testPageInfo} />
      </MemoryRouter>
    ));
  });

  it('should render without error', () => {
    expect(mountWrapper.length).toBe(1);
  });
});
