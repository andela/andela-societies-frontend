import React from 'react';
import { mount } from 'enzyme';
import ActivityCard from '../../../src/components/activities/ActivityCard';

describe('<ActivityCard />', () => {
  it('should render without crashing', () => {
    expect(mount.bind(
      null,
      <ActivityCard
        category=''
        date=''
        description=''
        points=''
        status='pending'
      />,
    )).not.toThrowError();
  });
});
