import React from 'react';
import { shallow } from 'enzyme';
import RedeemPointsDialogComponent from '../RedeemPointsDialogComponent';

describe('RedeemPointsDialogComponent', () => {
  const props = {
    open: true,
    date: null,
    reason: '',
    points: '',
    errors: {},
    usdValue: 0,
    onClose: jest.fn(),
    onChange: jest.fn(),
    handleRedemptionSubmit: jest.fn(),
  }
  const wrapper = shallow(<RedeemPointsDialogComponent {...props} />);

  it('has 3 TextField components', () => {
    expect(wrapper.find('TextField')).toHaveLength(3);
  });

  it('has ButtonComponent component', () => {
    expect(wrapper.find('ButtonComponent')).toHaveLength(1);
  });
});
