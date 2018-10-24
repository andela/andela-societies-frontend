import React from 'react';
import { mount } from 'enzyme';
import LeaderShipCard from '../../../src/components/Leadership/LeaderShipCard';
import leaders from '../../../src/fixtures/leaders';

describe('<LeaderShipCard />', () => {
  const props = {
    image: '',
    role: 'President',
    name: 'Steve',
  };
  const wrapper = mount.bind(
    null,
    <LeaderShipCard {...props} {...leaders} />,
  );
  it('should render without crashing', () => {
    expect(wrapper).not.toThrowError();
  });
  it('should render at least a leaders image', () => {
    expect(wrapper().find('.background-image').length).toBe(1);
  });
  it('should render the leaders details', () => {
    expect(wrapper().find('.content').length).toBe(1);
  });
});
