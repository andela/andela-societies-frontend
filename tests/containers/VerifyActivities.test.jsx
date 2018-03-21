import React from 'react';
import { mount } from 'enzyme';

import VerifyActivities from '../../src/containers/VerifyActivities';

describe('<VerifyActivities />', () => {
  it('should render without crashing', () => {
    expect(mount.bind(null, <VerifyActivities />)).not.toThrow();
  });
});
