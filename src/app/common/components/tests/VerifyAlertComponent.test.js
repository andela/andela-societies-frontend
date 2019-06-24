import React from 'react';
import { shallow } from 'enzyme';
import VerifyAlertModal from '../VerifyAlertComponent';

describe('<VerifyAlertModal />', () => {
  const shallowWrapper = shallow(<VerifyAlertModal> Test Alert </VerifyAlertModal>);

  it('should have button element', () => {
    expect(shallowWrapper.find('#dialog').text()).toContain('Test Alert');
  });
});
