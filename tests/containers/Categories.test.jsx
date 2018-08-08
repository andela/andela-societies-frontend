import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Categories from '../../src/containers/Categories';
import storeFixture from '../../src/fixtures/store';
import categories from '../../src/fixtures/categories';

const store = createMockStore(storeFixture);
const history = { push: () => { }, location: { pathname: '' } };

describe('<Categories />', () => {
  it('should render without crashing', () => {
    const wrapper = mount.bind(
      null,
      <Provider store={store}>
        <MemoryRouter>
          <Categories.WrappedComponent
            categories={categories}
            history={history}
            fetchCategories={() => {}}
            deleteCategory={() => {}}
            requesting={false}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).not.toThrow();
  });
});
