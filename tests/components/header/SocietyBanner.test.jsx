import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import SocietyBanner from '../../../src/components/header/SocietyBanner';

const society = {
  name: 'Invictus',
  remainingPoints: 2021,
  image: '',
};
const props = {
  society,
  handleChangeHeader: jest.fn(),
  currentTitle: 'Activities',
};
describe('<SocietyBanner />', () => {
  const mounted = mount.bind(
    null,
    <MemoryRouter>
      <SocietyBanner {...props} society={society} />
    </MemoryRouter>,
  );

  const wrapper = shallow(<SocietyBanner {...props} />);

  it('should render successfully', () => {
    expect(mounted).not.toThrow();
  });

  it('should call handleChangeHeader when the link is clicked', () => {
    wrapper.find('.societyBanner__nav--item').first().simulate('click');
    expect(props.handleChangeHeader).toBeCalledWith('Activities');
  });
});
