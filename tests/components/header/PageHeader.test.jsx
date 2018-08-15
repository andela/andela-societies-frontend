import React from 'react';
import { shallow } from 'enzyme';

// components
import PageHeader from '../../../src/components/header/PageHeader';

// constants
import { STATUSES } from '../../../src/constants/statuses';

// helpers
import capitalizeString from '../../../src/helpers/stringFormatter';

const props = {
  filterActivities: jest.fn(),
  filterRedemptions: jest.fn(),
  handleChangeTab: jest.fn(),
  hideFilter: false,
  selectedSociety: 'istelle',
  selectedStatus: 'All',
  showTabs: false,
  tabs: [],
  title: 'Invictus',
  handleApproveAllClick: () => {},
  handleSelectAllClick: () => {},
  showSelectAllApproveBtn: false,
  showSelectAllDeleteBtn: false,
  disabled: false,
};

const wrapper = shallow(<PageHeader {...props} />);
let capitalizedStatus;

describe('<PageHeader />', () => {
  it('should have props passed to it', () => {
    expect(wrapper.instance().props).toEqual(props);
  });

  it('should display `All` as the selected status ', () => {
    expect(wrapper.find('.filterOptions__button').text()).toBe(props.selectedStatus);
  });

  it('should display activity option filters', () => {
    const statuses = Object.keys(STATUSES);
    expect(wrapper.find('.filterOptions__option').length).toBe(statuses.length);
  });

  it('should display selected status as `selectedStatus`', () => {
    wrapper.setState({
      selectedStatus: STATUSES[2],
    });
    capitalizedStatus = capitalizeString(STATUSES[2]);
    expect(wrapper.find('.filterOptions__button').text()).toBe(capitalizedStatus);
  });
  it('should `tick` against the selected option', () => {
    wrapper.setState({
      selectedStatus: STATUSES[1],
    });
    capitalizedStatus = capitalizeString(STATUSES[1]);
    expect(wrapper.find('.filterOptions__option--active').text()).toBe(capitalizedStatus);
  });
});
