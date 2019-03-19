import React from 'react';
import { shallow } from 'enzyme';
import ProgressBarComponent from '../ProgressBarComponent';

describe('<ProgressBarComponent />', () => {
  const props = {
    earnedOrUsedPoints: 100,
    remPointsOrActivitiesLogged: 100,
  }
  const shallowWrapper = shallow(<ProgressBarComponent {...props} />);

  it('should have progress class', () => {
    expect(shallowWrapper.find('.progress')).toHaveLength(1);
  });
});
