import React from 'react';
import { shallow } from 'enzyme';

import TruncateDescriptionContainer from '../TruncateDescriptionContainer';

describe('<TruncateDescriptionContainer />', () => {
  const setUpWrapper = ({
      description = 'Jim Shelton of ChanZuckerberginitiative sits down with Andela fellows at Andela\'s Nairobi HQ in a Facebook Live event',
      wordCount = 80
    } = {}) => {
    const props = { description, wordCount };
    return shallow(<TruncateDescriptionContainer {...props} />);
  };

  it('should render TruncateDescriptionContainer', () => {
    const shallowWrapper = setUpWrapper();
    expect(shallowWrapper.length).toBe(1);
  });

  it('should show see more button when description is long', () => {
    const shallowWrapper = setUpWrapper();
    expect(shallowWrapper.find('.button--see-more-or-less').html()).toContain('see more');
  });

  it('should change state and button text to see less when see more is clicked', () => {
    const shallowWrapper = setUpWrapper();
    const seeMoreBtn = shallowWrapper.find('.button--see-more-or-less');
    seeMoreBtn.simulate('click');
    expect(shallowWrapper.state().isItALongDesc).toEqual(false);
    expect(shallowWrapper.html()).toContain('see less');
  });

  it('should not see more button when description is short', () => {
    const shallowWrapper = setUpWrapper({ description: 'Lorem ipsum dolor sit amet.' });
    expect(shallowWrapper.find('.button--see-more-or-less').length).toBe(0);
  });
});
