import React from 'react';
import { shallow } from 'enzyme';
import StatusIndicatorComponent from '../StatusIndicatorComponent';

describe('<StatusIndicatorComponent />', () => {
  const shallowWrapper = shallow(<StatusIndicatorComponent />);

  it('should have span tag with class indicator', () => {
    expect(shallowWrapper.find('.indicator')).toHaveLength(1);
  });
});
