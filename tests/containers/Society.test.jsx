import React from 'react';
import { mount, shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Society from '../../src/containers/Society';
import activities from '../../src/fixtures/activities';
import societyInfo from '../../src/fixtures/society';
import storeFixture from '../../src/fixtures/store';

const store = createMockStore(storeFixture);
const props = {
  title: 'Activities',
  societyInfo: {
    requesting: false,
    info: { ...societyInfo },
    error: {},
  },
};

const component = shallow(<Society.WrappedComponent {...props} />);
const mounted = mount.bind(
  null,
  <Provider store={store}>
    <MemoryRouter>
      <Society />
    </MemoryRouter>
  </Provider>,
);

describe('<Society />', () => {
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
    expect(mounted.length).toBe(1);
  });
  it('should render Activity cards', () => {
    component.setState({ filteredActivities: activities });
    expect(component
      .find('MasonryLayout')
      .dive()
      .find('ActivityCard').length).toBe(4);
  });

  it('should render Leadership cards when the title selected is LeaderShip', () => {
    component.setProps({
      title: 'Leadership',
    });
    expect(component
      .find('MasonryLayout')
      .dive()
      .find('LeaderShipCard').length).toBe(4);
  });
});
