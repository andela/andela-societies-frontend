import React from 'react';
import { mount } from 'enzyme';
import DateField from '../../src/common/DateField';

describe('<DateField />', () => {
  const props = {
    handleChange: () => {},
    value: '2018-08-17',
  };

  it('should render withour crashing', () => {
    expect(mount.bind(null, <DateField {...props} />)).not.toThrow();
  });
});
