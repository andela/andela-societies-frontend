import React from 'react';
import { shallow } from 'enzyme';

import PageNotFound from '../../src/containers/PageNotFound';

describe('<PageNotFound />', () => {
  let shallowWrapper;
  beforeEach((() => {
    shallowWrapper = shallow(<PageNotFound />);
  }));

  it('should render without crashing', () => {
    expect(shallowWrapper).toHaveLength(1);
  });

  it('should contain an article tag', () => {
    const instance = shallowWrapper.instance();
    expect(shallowWrapper.find('article').length).toBe(1);
    expect(instance).toBe(null);
    expect(shallowWrapper.find('article').children().length).toBe(3);
  });
});
