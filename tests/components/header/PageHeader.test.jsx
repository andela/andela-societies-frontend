import React from 'react';
import { shallow } from 'enzyme';

import PageHeader from '../../../src/components/header/PageHeader';

const props = {
  filterActivities: () => {},
  selectedStatus: 'All',
  title: 'Invictus',
  hideFilter: false,
  handleApproveAllClick: () => {},
  handleSelectAllClick: () => {},
  showSelectAllApproveBtn: false,
};

const status = {
  activeClass: 'filterOptions__option--active',
  statuses: ['All', 'In review', 'Pending', 'Rejected', 'Approved'],
};

const wrapper = shallow(<PageHeader {...props} />);

describe('<PageHeader />', () => {
  wrapper.setState({
    statuses: status.statuses,
  });
  it('should have props passed to it', () => {
    expect(wrapper.instance().props).toEqual(props);
  });

  it('should display `All` as the selected status ', () => {
    expect(wrapper.find('.filterOptions__button').text()).toBe(props.selectedStatus);
  });

  it('should display activity option filters', () => {
    expect(wrapper.find('.filterOptions__option').length).toBe(status.statuses.length);
  });

  it('should display selected status as `selectedStatus`', () => {
    wrapper.setState({
      selectedStatus: status.statuses[2],
    });
    expect(wrapper.find('.filterOptions__button').text()).toBe(status.statuses[2]);
  });
  it('should `tick` against the selected option', () => {
    wrapper.setState({
      selectedStatus: status.statuses[1],
    });
    expect(wrapper.find(`.${status.activeClass}`).text()).toBe(status.statuses[1]);
  });
});
