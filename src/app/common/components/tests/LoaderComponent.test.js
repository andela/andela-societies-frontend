import React from 'react';
import { shallow } from 'enzyme';
import LoaderComponent from '../LoaderComponent';

describe('<LoaderComponent />', () => {
  const shallowWrapper = shallow(<LoaderComponent />);

  it('should have spinner-border class', () => {
    expect(shallowWrapper.find('.spinner-border')).toHaveLength(1);
  });
});
