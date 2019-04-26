import React from 'react';
import { mount, shallow } from 'enzyme';

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
    createRedemption: jest.fn(),
    fetchUserActivites: jest.fn(),
    fetchSocietyInfoRequest: jest.fn(),
    fetchSocietyRedemptionsRequest: jest.fn(),
  };
  const shallowWrapper = mount(<RedemptionsContainer {...props} />);
  const wrapper = shallow(<RedemptionsContainer {...props} />);

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
    const spy = jest.spyOn(instance.props, 'fetchSocietyInfoRequest');
    shallowWrapper.setProps({ societyName: 'istelle' });
    expect(spy).toHaveBeenCalled();
  });

  it('changes state of openRedeemPointsModal when showRedeemPointsModal is called', () => {
    shallowWrapper.setState({ openRedeemPointsModal: false });
    const instance = shallowWrapper.instance();
    instance.showRedeemPointsModal(true);
    expect(shallowWrapper.state().openRedeemPointsModal).toBeTruthy()
  });

  it('changes state of reason when handleChange is called', () => {
    shallowWrapper.setState({ reason: 'TEST' });
    const instance = shallowWrapper.instance();
    const event  = {
      target: {
        name: 'reason',
        value: 'Just because'
      }
    }
    instance.handleChange(event);
    expect(shallowWrapper.state().reason).toEqual('Just because');
  });

  it('changes state of points when handleChange is called with the event name usdValue', () => {
    shallowWrapper.setState({ points: null });
    const instance = shallowWrapper.instance();
    const event  = {
      target: {
        name: 'usdValue',
        value: 100
      }
    }
    instance.handleChange(event);
    expect(shallowWrapper.state().usdValue).toEqual(100);
  });

  it('invokes createRedemption when handleRedemptionSubmit is called', () => {
    shallowWrapper.setState({ date: '12/01/03', reason: 'test', usdValue: 200, center: 'nairobi' });
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'createRedemption');
    instance.handleRedemptionSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it('has validateFormFields that returns form errors', () => {
    const formData = { date: '12/01/03', reason: '', usdValue: 200, center: 'nairobi' };
    const instance = shallowWrapper.instance();
    const error = instance.validateFormFields(formData);
    expect(error).toEqual({ reason: 'This field is required'});
  });

  it('set errors state when handleRedemptionSubmit is called with form errors', () => {
    shallowWrapper.setState({ date: '12/01/03', reason: '', usdValue: 200, center: 'nairobi' });
    const instance = shallowWrapper.instance();
    instance.handleRedemptionSubmit();
    expect(shallowWrapper.state().errors).toEqual({reason: 'This field is required'});
  });

  it('invokes showRedeemPointsModal when New Redemption button is clicked', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance, 'showRedeemPointsModal');
    shallowWrapper.find('.button__add .button__redemption').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('invokes fetchSocietyInfoRequest when societyName prop change', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'fetchSocietyInfoRequest');
    shallowWrapper.setProps({ societyName: 'phoenix', society: { phoenix: { redemptions: [] }} });
    expect(spy).toHaveBeenCalled();
  });

  it('should open the Log Points Modal', () => {
    const instance = wrapper.instance();
    instance.setState({ logPoints: false });
    expect(instance.state.logPoints).toBe(false);
    wrapper.find('.button__points').simulate('click');
    expect(instance.state.logPoints).toBe(true);
  });
});
