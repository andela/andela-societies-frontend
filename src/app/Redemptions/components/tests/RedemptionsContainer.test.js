import React from 'react';
import { shallow } from 'enzyme';

import { RedemptionsContainer } from '../RedemptionsContainer';

import { redemptions } from './fixtures';

describe('<RedemptionsContainer />', () => {
  const props = {
    societyName: 'phoenix',
    society: {
      phoenix: {
        usedPoints: 100,
        remainingPoints: 100,
        totalPoints: 200,
        activitiesLogged: redemptions.length,
        redemptions,
      },
      istelle: {
        usedPoints: 100,
        remainingPoints: 100,
        totalPoints: 200,
        activitiesLogged: redemptions.length,
        redemptions,
      },
    },
    fetchUserActivites: jest.fn(),
    fetchSocietyRedemptionsRequest: jest.fn(),
  };
  const shallowWrapper = shallow(<RedemptionsContainer {...props} />);

  it('has a 3 ButtonComponents', () => {
    expect(shallowWrapper.find('ButtonComponent')).toHaveLength(3);
  });

  it('has RedemptionsComponent', () => {
    expect(shallowWrapper.find('RedemptionsComponent')).toHaveLength(1);
  });

  it('has SocietyStatsComponent', () => {
    expect(shallowWrapper.find('SocietyStatsComponent')).toHaveLength(1);
  });

  it('invokes fetchSocietyRedemptionsRequest in componentDidUpdate when societyName props change', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'fetchSocietyRedemptionsRequest');
    shallowWrapper.setProps({ societyName: 'istelle' });
    expect(spy).toHaveBeenCalled();
  });
});
