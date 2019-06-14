import React from 'react';
import { shallow } from 'enzyme';
import { MenuItem } from '@material-ui/core';

import Item from '../MenuItem';
import { categories } from '../../../Dashboard/operations/tests/fixtures';


describe('<MenuItemComponent />', () => {
  const shallowWrapper = shallow(<Item categories={categories} />);

  it('should pass down the category values', () => {
    expect(shallowWrapper.find(<MenuItem key={categories.id} value={categories} />)).toBeDefined();
  });
});
