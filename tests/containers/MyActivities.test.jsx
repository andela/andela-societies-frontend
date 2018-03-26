import React from 'react';
import { mount } from 'enzyme';

import MyActivities from '../../src/containers/MyActivities';

describe('<MyActivities />', () => {
  it('should render without crashing', () => {
    expect(mount.bind(null, <MyActivities />)).not.toThrow();
  });
});
