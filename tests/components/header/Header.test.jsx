import React from 'react';
import { mount } from 'enzyme';
import Header from '../../../src/components/header/Header';
import { nonFellowTokenInfo } from '../../__mocks__/tokenInfoMock';

describe('<Header />', () => {
  it('should render without crashing', () => {
    expect(mount.bind(null, <Header userInfo={nonFellowTokenInfo.UserInfo} />)).not.toThrow();
  });
});
