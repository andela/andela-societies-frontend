import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../onBoardingModal';

const props = {
  close: jest.fn(),
};

describe('<OnBoardingModal />', () => {
  const shallowWrapper = shallow(<Modal {...props} />);

  it('should call the close modal function', () => {
    shallowWrapper.find('.btn-cancel').simulate('click');
    expect(props.close).toBeCalled();
  });
});
