import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import Button from '../../src/common/Button';

describe('<Button />', () => {
  const props = {
    name: 'approve',
    value: 'Approve',
    className: 'activity-button approved',
    handleClick: stub(),
  };

  const wrapper = shallow(<Button {...props} />);

  it('should render without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should display right button name', () => {
    expect(wrapper.find('.activity-button .approved').text()).toContain('Approve');
  });
});
