import React from 'react';
import { mount } from 'enzyme';
import Header from '../../../src/components/header/Header';

describe('<Header />', () => {
  it('should render without crashing', () => {
    expect(mount.bind(null, <Header />)).not.toThrow();
  });
});
