import React from 'react';
import { shallow } from 'enzyme';
import AlertDialogComponent from '../AlertDialogComponent';

describe('<AlertDialogComponent />', () => {
  const props = {
    open: true,
    onClose: null,
    message: 'Test approved message',
    status: 'approved',
  }
  const shallowWrapper = shallow(<AlertDialogComponent {...props} />);

  it('should have message passed in as props', () => {
    expect(shallowWrapper.find('.alert-dialog__title').html()).toContain('Test approved message');
  });
});