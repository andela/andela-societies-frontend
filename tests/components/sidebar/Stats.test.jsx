import React from 'react';
import { mount } from 'enzyme';
import Stats from '../../../src/components/sidebar/Stats';

describe('<Stats />', () => {
  it('should render without crashing', () => {
    expect(mount.bind(null, <Stats stats={[{ name: 'Foo', value: 5 }]} />)).not.toThrow();
  });
});
