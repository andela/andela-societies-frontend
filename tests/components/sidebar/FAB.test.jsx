import React from 'react';
import { shallow } from 'enzyme';
import FAB from '../../../src/components/sidebar/FAB';

describe('Testing <FAB /> component', () => {
  let wrapper;
  beforeEach(() => { wrapper = shallow(<FAB />); });
  it('includes 1 div with class fab', () => {
    expect(wrapper.find('div.fab')).toHaveLength(1);
  });
  it('includes 1 div with class line', () => {
    expect(wrapper.find('div.line')).toHaveLength(1);
  });
  it('includes 1 div with class line2', () => {
    expect(wrapper.find('div.line2')).toHaveLength(1);
  });
});
